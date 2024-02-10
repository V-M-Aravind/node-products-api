const Product = require("../models/product");
const statusUtils = require("../utilities/statusUtils");
const mongoose = require("mongoose");

const { getProductNotFoundError, getServerError, PRODUCT_DELETED_MSG } =
  statusUtils;
const getAllProducts = async (_, res, next) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (err) {
    console.error(err);
    err = getServerError();
    /**here since we are not inside any promise code, throw will also work intead of next(error)
     *throw err
     if we are throwing an error inside promise then catch,there it will not work as it is running asynchronously. There you have to use next(error)
     */
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const prdId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(prdId)) {
      const err = getProductNotFoundError();
      throw err;
    }
    const product = await Product.findById(prdId);
    if (!product) {
      const err = getProductNotFoundError();
      throw err;
    }
    return res.json(product);
  } catch (err) {
    console.error(err);
    if (!err.statusCode) {
      err = getServerError();
    }
    next(err);
  }
};

const addProduct = async (req, res, next) => {
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
    if (!err.statusCode) {
      err = getServerError();
    }
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const prdId = req.params.id;
    let product = await Product.findById(prdId);
    if (!product) {
      const err = getProductNotFoundError();
      throw err;
    }
    product.title = req.body.title;
    product.price = req.body.price;
    product.qty = req.body.qty;
    product.imgUrl = req.body.imgUrl;
    product.description = req.body.description;
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    if (!err.statusCode) {
      err = getServerError();
    }
    throw err;
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const prdId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(prdId)) {
      const err = getProductNotFoundError();
      throw err;
    }
    const product = await Product.findByIdAndDelete(prdId);
    if (!product) {
      const err = getProductNotFoundError();
      throw err;
    }
    return res.json(PRODUCT_DELETED_MSG);
  } catch (error) {
    console.error(error);
    if (!error.statusCode) {
      error = getServerError();
    }
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
