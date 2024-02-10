const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const { CustomError, getServerError } = require("../utilities/statusUtils");

const postSignIn = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let adminUser;
  Admin.findOne({ username: username })
    .then((admin) => {
      if (!admin) {
        throw new CustomError("Username is invalid", 401, "LOGIN_FAILED");
      }
      adminUser = admin;
      return bcrypt.compare(password, admin.password);
    })
    .then((isEqual) => {
      if (isEqual) {
        const token = jwt.sign(
          { username, userId: adminUser._id.toString() },
          process.env.JWT_SECRET,
          {
            expiresIn: "0.5h",
          }
        );
        req.userId = adminUser._id.toString();
        return res.json({ message: "Login Success", statusCode: 200, token });
      } else {
        const err = new CustomError(
          "Password is incorrect",
          401,
          "LOGIN_FAILED"
        );
        throw err;
      }
    })
    .catch((err) => {
      console.error(err);
      if (!err.statusCode) {
        err = getServerError();
      }
      next(err);
    });
};

module.exports = {
  postSignIn,
};
