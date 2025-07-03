const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "user",
    },
    phone: String,
    country: String,
    birthDate: Date,
    active: {
      type: Boolean,
      default: true,
    },
    refreshToken: String,
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12); // Hash the password before saving
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
