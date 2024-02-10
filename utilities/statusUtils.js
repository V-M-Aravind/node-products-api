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

class CustomError extends Error {
  constructor(msg, statusCode, statusText) {
    super(msg);
    this.statusCode = statusCode;
    this.statusText = statusText;
  }
}

function getServerError() {
  const err = new CustomError(
    SERVER_ERROR.message,
    500,
    SERVER_ERROR.statusText
  );
  return err;
}
function getProductNotFoundError() {
  const err = new CustomError(
    PRODUCT_NOT_FOUND_ERROR.message,
    404,
    PRODUCT_NOT_FOUND_ERROR.statusText
  );
  return err;
}
function getAuthenticationError() {
  const error = new CustomError("Not Authenticated", 401, "NOT_AUTHENTICATED");
  return error;
}
function getUnAuthorizedError() {
  const error = new CustomError(
    "Unauthorized Error",
    401,
    "UNAUTHORIZED_ERROR"
  );
  return error;
}
function getSessionExpiredError() {
  const error = new CustomError(
    "Session Expired. Please login again.",
    401,
    "SESSION_EXPIRED"
  );
  return error;
}
function getValidationError(message) {
  message = message || "Request body validation failed";
  const error = new CustomError(message, 400, "VALIDATION ERROR");
  return error;
}

module.exports = {
  getProductNotFoundError,
  PRODUCT_DELETED_MSG,
  getServerError,
  CustomError,
  getAuthenticationError,
  getSessionExpiredError,
  getUnAuthorizedError,
  getValidationError,
};
