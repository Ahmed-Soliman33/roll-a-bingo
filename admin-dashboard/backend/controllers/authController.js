const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const ApiError = require("../utils/ApiError");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// Options for the refresh token cookie
const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict", // Prevent Cross-Site Request Forgery (CSRF) attacks
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
  path: "/api/v1/auth/", // Restrict cookie to the refresh token route
};

// Send access and refresh tokens in the response
const sendResponse = async (res, user, code) => {
  const token = generateToken(user._id);
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
  );

  // Update user document with the new refresh token
  const updated = await User.findByIdAndUpdate(
    user._id,
    { refreshToken },
    { new: true }
  );
  if (process.env.NODE_ENV === "development") {
    console.log("User document updated:", updated);
  }

  // Set refresh token cookie and send JWT in the response
  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

  user.password = undefined; // Exclude password from response
  user.refreshToken = undefined; // Exclude refresh token from response
  res.status(code).json({ status: "success", token, data: user });
};

// @desc    Register a new user
// @route   POST /api/v1/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, phone } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
  });

  sendResponse(res, user, 201);
});

// @desc    Authenticate user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  // Verify user existence and password match
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await user.comparePassword(req.body.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }

  // Generate and send authentication tokens
  sendResponse(res, user, 201);
});

// @desc    Refresh access token
// @route   GET /api/v1/auth/refresh-token
// @access  Private
exports.refreshAccessToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return next(new ApiError("You are not logged in, please log in", 401));
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const user = await User.findById(decoded.userId);

  if (!user || user.refreshToken !== refreshToken) {
    return next(new ApiError("Invalid refresh token", 403));
  }

  // Rotate refresh token and issue new tokens
  sendResponse(res, user, 200);
});

// @desc    Log out user
// @route   DELETE /api/v1/auth/logout
// @access  Public
exports.logout = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: null });
  }

  res.cookie("refreshToken", "", refreshTokenCookieOptions);

  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
});

// @desc    Retrieve current user details
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  res.status(200).json({ status: "success", data: user });
});

// @desc    Protect routes with authentication
exports.protect = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  // Extract and validate access token from headers
  let accessToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    accessToken = req.headers.authorization.split(" ")[1];
  }
  if (!accessToken) {
    return next(new ApiError("Unauthorized access, please log in", 401));
  }

  // Extract and validate refresh token from cookies
  if (!refreshToken) {
    return next(
      new ApiError("Unauthorized access, you are not logged in", 401)
    );
  }

  // Verify refresh token integrity and expiration
  const decodedRefresh = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  // Verify access token integrity and expiration
  const decodedAccess = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET
  );

  // Validate user existence
  const currentUser = await User.findById(decodedAccess.userId);
  if (!currentUser) {
    return next(
      new ApiError("User associated with token no longer exists", 401)
    );
  }

  // Check if refresh token user ID matches the access token user ID
  if (decodedRefresh.userId !== decodedAccess.userId) {
    return next(new ApiError("Invalid token, please log in again", 401));
  }

  // Check if password was changed after token issuance
  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    if (passChangedTimestamp > decodedAccess.iat) {
      return next(
        new ApiError("Password recently changed, please log in again", 401)
      );
    }
  }
  console.log("Current user:", currentUser);

  // Attach user to request object
  req.user = currentUser;
  next();
});

// @desc    Verify account activation status
// @route   Middleware
// @access  Private
exports.checkAccountActive = asyncHandler(async (req, res, next) => {
  if (!req.user.active) {
    return next(new ApiError("Account deactivated, please activate it", 401));
  }
  next();
});

// @desc    Authorize user roles
// @route   Middleware
// @access  Private
/**
 * @param {...("user" |"admin" | "manager")} roles
 * @returns {void}
 */
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    // Validate user role against permitted roles
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(`Role ${req.user.role} not authorized for this route`, 403)
      );
    }
    next();
  });

//  ------------------------- PASSWORD RESET CYCLE -------------------------

// @desc    Initiate password reset process
// @route   POST /api/v1/auth/forgotPassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // Retrieve user based on provided email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`No user found with email: ${req.body.email}`, 404)
    );
  }

  // Generate a 6-digit reset code
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Hash and store the reset code
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");
  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;
  await user.save();

  // Send reset code via email
  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Code (Valid for 10 minutes)",
      html: `
        <h4>Dear ${user.name}</h4>
        <p>We have received a request to reset your password for your Eshop account.</p>
        <b>${resetCode}</b>
        <br />
        <p>Please use this code to complete the password reset process.</p>
        <span>This code will expire in 10 minutes.</span>
        <p>Best regards,<br />Eshop Team</p>
      `,
    });
  } catch (error) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;
    await user.save();
    return next(new ApiError("Failed to send reset email", 500));
  }
  res
    .status(200)
    .json({ status: "success", message: "Reset code sent to your email" });
});

// @desc    Verify password reset code
// @route   POST /api/v1/auth/verifyResetCode
// @access  Public
exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
  // Validate reset code against stored hash
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");
  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ApiError("Invalid or expired reset code", 404));
  }

  // Mark reset code as verified
  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({ status: "success" });
});

// @desc    Reset user password
// @route   PUT /api/v1/auth/resetPassword
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Retrieve user based on email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("No user found with this email address", 404));
  }

  // Validate reset code verification
  if (!user.passwordResetVerified) {
    return next(new ApiError("Reset code not verified", 404));
  }

  // Update user password and clear reset fields
  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;
  await user.save();

  // Generate and send new authentication tokens
  sendResponse(res, user, 200);
});
