const PRODUCT_NOT_FOUND_ERROR = {
  message: "No Product Found",
  statusText: "NO_PRODUCT_FOUND",
};
const PRODUCT_DELETED_MSG = {
  message: "Product Successfully Deleted",
  statusText: "PRODUCT_DELETED",
};
const SERVER_ERROR = {
  message: "Something went wrong",
  statusText: "SERVER_ERROR",
};

function getServerError() {
  const err = new Error(SERVER_ERROR.message);
  err.statusCode = 500;
  err.statusText = SERVER_ERROR.statusText;
  return err;
}
function getProductNotFoundError() {
  const err = new Error(PRODUCT_NOT_FOUND_ERROR.message);
  err.statusCode = 404;
  err.statusText = SERVER_ERRPRODUCT_NOT_FOUND_ERROROR.statusText;
  return err;
}
module.exports = {
  getProductNotFoundError,
  PRODUCT_DELETED_MSG,
  getServerError,
};
