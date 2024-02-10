const errorHandler = (error, req, res, next) => {
  const { statusCode, statusText, message } = error;
  return res.status(statusCode).json({ statusText, message });
};
module.exports = errorHandler;
