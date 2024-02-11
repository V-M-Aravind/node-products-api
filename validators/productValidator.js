const yup = require("yup");

let productSchema = yup.object({
  title: yup
    .string("Title must be of type string")
    .required()
    .min(3, "Title must contain minimum of 3 characters"),
  price: yup
    .number("Price must be a number")
    .required()
    .positive("Price must be greater than zero"),
  qty: yup
    .number("Quantity must be a number")
    .required()
    .positive("Quantity must be an integer")
    .integer("Quantity must be an integer"),
  imgUrl: yup
    .string("Image must be an url")
    .required()
    .url("Image must be an url"),
  description: yup
    .string("Description must be of type string")
    .required()
    .min(15, "Description must contain minimum of 15 characters")
    .max(400, "Description must not exceed maximum of 400 characters"),
});

module.exports = productSchema;
