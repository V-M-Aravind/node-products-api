const Product = require("../models/product");

const PRODUCTS_NOT_FOUND = {
  message: "No Products Found",
  status: "NO_PRODUCTS_FOUND",
};
const PRODUCT_NOT_FOUND = {
  message: "No Product Found",
  status: "NO_PRODUCT_FOUND",
};
const PRODUCT_DELETED = {
  message: "Product Successfully Deleted",
  status: "PRODUCT_DELETED",
};
const SERVER_ERROR = {
  message: "Something went wrong",
  status: "SERVER_ERROR",
};

const getAllProducts = (_, res) => {
  try {
    const products = Product.getAllProducts();
    return res.json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json(PRODUCTS_NOT_FOUND);
  }
};

const getProductById = (req, res) => {
  try {
    const prdId = Number(req.params.id);
    const product = Product.getProduct(prdId);
    return res.json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json(PRODUCT_NOT_FOUND);
  }
};

const addProduct = async (req, res) => {
  try {
    let product = new Product(
      null,
      req.body.title,
      req.body.price,
      req.body.qty,
      req.body.imgUrl,
      req.body.description
    );
    product = product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(SERVER_ERROR);
  }
};

const updateProduct = (req, res) => {
  try {
    const product = new Product(
      Number(req.body.id),
      req.body.title,
      req.body.price,
      req.body.qty,
      req.body.imgUrl,
      req.body.description
    );
    product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(SERVER_ERROR);
  }
};

const deleteProduct = (req, res) => {
  try {
    const prdId = Number(req.params.id);
    Product.deleteProduct(prdId);
    return res.json(PRODUCT_DELETED);
  } catch (error) {
    console.log(error);
    res.status(500).json(SERVER_ERROR);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
