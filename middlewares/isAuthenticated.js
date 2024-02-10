const jwt = require("jsonwebtoken");
const statusUtils = require("../utilities/statusUtils");

const { getServerError, getUnAuthorizedError, getSessionExpiredError } =
  statusUtils;

module.exports = (req, _, next) => {
  const authorizationHeader = req.get("Authorization");
  if (!authorizationHeader) {
    const error = getUnAuthorizedError();
    //throw error;
    return next(error);
  }
  const token = authorizationHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      error = getSessionExpiredError();
    } else if (error instanceof jwt.JsonWebTokenError) {
      error = getUnAuthorizedError();
    } else if (!error.statusCode) {
      error = getServerError();
    }
    //next(error);
    throw error;
  }
  if (!decodedToken) {
    const error = getUnAuthorizedError();
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
