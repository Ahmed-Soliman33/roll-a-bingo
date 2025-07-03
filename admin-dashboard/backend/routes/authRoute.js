const express = require("express");
const {
  login,
  signup,
  refreshAccessToken,
  logout,
  getMe,
  protect,
  checkAccountActive,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/refresh-token").get(refreshAccessToken);

// Reset Password Routes
router.route("/forgotPassword").post(forgotPassword);
router.route("/verifyResetCode").post(verifyPassResetCode);
router.route("/resetPassword").put(resetPassword);

// Protected Routes for authenticated users
router.use(protect, checkAccountActive);

router.route("/logout").delete(logout);
router.route("/me").get(getMe);

module.exports = router;
