const mongoose = require("mongoose");
const yup = require("yup");
const Product = require("../models/product");
const statusUtils = require("../utilities/statusUtils");
const productSchema = require("../validators/productValidator");

const {
  getProductNotFoundError,
  getServerError,
  PRODUCT_DELETED_MSG,
  getValidationError,
  getSpecialAdminPrivilegeError,
} = statusUtils;
const reservedProductsIdArray = [
  "65c8637d12fe0f749df9a1b7",
  "65c8644da5e926d0a0de9442",
  "65c8650da5e926d0a0de9444",
  "65c86592370532c0a7dd0605",
  "65c865f4370532c0a7dd0607",
];
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
  const productBody = {
    title: req.body.title,
    price: req.body.price,
    qty: req.body.qty,
    imgUrl: req.body.imgUrl,
    description: req.body.description,
  };

  try {
    await productSchema.validate(productBody, {
      strict: true,
    });
    const product = await Product.create({
      ...productBody,
    });
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    if (err instanceof yup.ValidationError) {
      err = getValidationError(err.message);
    } else if (!err.statusCode) {
      err = getServerError();
    }
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const prdId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(prdId)) {
      const err = getProductNotFoundError();
      throw err;
    }
    if (reservedProductsIdArray.find((resPrdId) => resPrdId === prdId)) {
      const err = getSpecialAdminPrivilegeError();
      throw err;
    }
    let product = await Product.findById(prdId);
    if (!product) {
      const err = getProductNotFoundError();
      throw err;
    }
    const productBody = {
      title: req.body.title,
      price: req.body.price,
      qty: req.body.qty,
      imgUrl: req.body.imgUrl,
      description: req.body.description,
    };
    await productSchema.validate(productBody, {
      strict: true,
    });
    product.title = productBody.title;
    product.price = productBody.price;
    product.qty = productBody.qty;
    product.imgUrl = productBody.imgUrl;
    product.description = productBody.description;
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    if (err instanceof yup.ValidationError) {
      err = getValidationError(err.message);
    } else if (!err.statusCode) {
      err = getServerError();
    }
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const prdId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(prdId)) {
      const err = getProductNotFoundError();
      throw err;
    }
    if (reservedProductsIdArray.find((resPrdId) => resPrdId === prdId)) {
      const err = getSpecialAdminPrivilegeError();
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
