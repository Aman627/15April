const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

// @desc Fetch all products
// @route /api/products
// @access public
const getProducts = asyncHandler(async (req, res) => {
  const prodcuts = await Product.find({});
  res.json(prodcuts);
});

// @desc Fetch single products
// @route /api/products/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("404 not Found");
  }
});

module.exports = { getProducts, getProductById };
