const Product = require("../models/product");

const getAddProductPage = (_, res) => {
  return res.render("add-product");
};
const getUpdateInitialProductPage = (_, res) => {
  return res.render("update-product-initial");
};

const getUpdateFinalProductPage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.render("update-product-final", { product: product });
  } catch (error) {
    console.error(error);
    return res.render("update-product-final", { product: null });
  }
};

module.exports = {
  getAddProductPage,
  getUpdateInitialProductPage,
  getUpdateFinalProductPage,
};
