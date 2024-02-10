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
    .min(
      20,
      "Description must contain minimum of 20 characters and maximum of 50 characters"
    )
    .max(
      50,
      "Description must contain minimum of 20 characters and maximum of 50 characters"
    ),
});

module.exports = productSchema;
