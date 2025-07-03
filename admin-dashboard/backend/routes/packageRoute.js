const express = require("express");
const {
  createPackage,
  getAllPackages,
  getPackage,
  updatePackage,
  deletePackage,
  addFeatureToPackage,
  getPackageFeatures,
} = require("../controllers/packageController");
const { allowedTo } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(getAllPackages)
  .post(allowedTo("manager", "admin"), createPackage);

router
  .route("/:id")
  .get(getPackage)
  .patch(allowedTo("manager", "admin"), updatePackage)
  .delete(allowedTo("manager", "admin"), deletePackage);

router
  .route("/:id/features")
  .post(allowedTo("manager", "admin"), addFeatureToPackage)
  .get(getPackageFeatures);

module.exports = router;
