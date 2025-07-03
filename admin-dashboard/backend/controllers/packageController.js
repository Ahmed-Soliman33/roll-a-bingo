const factoryController = require("./factoryController");
const Package = require("../models/Package");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

// @desc Create a new package
// @route POST /api/v1/packages
// @access Private
exports.createPackage = factoryController.createOne(Package);

// @desc get All packages
// @route GET /api/v1/packages
// @access Public
exports.getAllPackages = factoryController.getAll(Package);

// @desc get specific package
// @route GET /api/v1/packages/:id
// @access Private
exports.getPackage = factoryController.getOne(Package);

// @desc update specific package
// @route PATCH /api/v1/packages/:id
// @access Private
exports.updatePackage = factoryController.updateOne(Package);

// @desc delete specific package
// @route DELETE /api/v1/packages/:id
// @access Private
exports.deletePackage = factoryController.deleteOne(Package);

// @desc Add feature To specific package
// @route POST /api/v1/packages/:id/features
// @access Private
exports.addFeatureToPackage = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const document = await Package.findById(id);
  if (!document) {
    return next(new ApiError(`Document with id: ${id} not found`, 404));
  }

  const { name, active } = req.body;

  const feature = document.features.find((f) => f.name === name);
  if (feature) {
    return next(
      new ApiError(`Feature with name: ${name} is already exists`, 404)
    );
  }

  document.features.push({ name, active, id: Date.now() });
  await document.save();

  res.status(200).json({ data: document });
});

// @desc Get features For specific package
// @route GET /api/v1/packages/:id/features
// @access Private
exports.getPackageFeatures = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const document = await Package.findById(id);
  if (!document) {
    return next(new ApiError(`Document with id: ${id} not found`, 404));
  }

  res.status(200).json({ data: document.features });
});
