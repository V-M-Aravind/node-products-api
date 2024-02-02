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

const getAllProducts = async (_, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) return res.status(500).json(PRODUCTS_NOT_FOUND);
    return res.json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json(PRODUCTS_NOT_FOUND);
  }
};

const getProductById = async (req, res) => {
  try {
    const prdId = req.params.id;
    const product = await Product.findById(prdId);
    if (!product) return res.status(500).json(PRODUCT_NOT_FOUND);
    return res.json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json(PRODUCT_NOT_FOUND);
  }
};

const addProduct = async (req, res) => {
  try {
    const product = await Product.create({
      title: req.body.title,
      price: req.body.price,
      qty: req.body.qty,
      imgUrl: req.body.imgUrl,
      description: req.body.description,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(SERVER_ERROR);
  }
};

const updateProduct = async (req, res) => {
  try {
    const _id = req.body._id;
    const prodDetails = {
      title: req.body.title,
      price: req.body.price,
      qty: req.body.qty,
      imgUrl: req.body.imgUrl,
      description: req.body.description,
    };
    let product = await Product.findByIdAndUpdate(_id, prodDetails, {
      returnDocument: "after",
    });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(SERVER_ERROR);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const prdId = req.params.id;
    const pr = await Product.findByIdAndDelete(prdId);
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
