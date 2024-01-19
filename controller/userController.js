const getHomePage = (_, res) => {
  return res.render("home");
};
const getAddProductPage = (_, res) => {
  return res.render("add-product");
};

module.exports = {
  getHomePage,
  getAddProductPage,
};
