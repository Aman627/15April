const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  getProducts,
  getProductById,
} = require("../controllers/productController");
const Product = require("../models/Product");
const router = express.Router();

// @desc Fetch all products
// @route /api/products
// @access public
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

module.exports = router;
