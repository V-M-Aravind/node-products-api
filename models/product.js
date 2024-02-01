// const readDataFile = require("../utilities/readDataFile");
// const writeDataFile = require("../utilities/writeDataFile");
const { writeDataFile, readDataFile } = require("../utilities/accessDataFile");
class Product {
  constructor(id, title, price, qty, imgUrl, description) {
    this.id = id;
    this.title = title;
    this.price = Number(price);
    this.qty = Number(qty);
    this.imgUr = imgUrl;
    this.description = description;
  }
  save() {
    const productsData = readDataFile();
    if (this.id) {
      productsData.products = productsData.products.map((prd) => {
        if (prd.id === this.id) return this;
        else return prd;
      });
    } else {
      this.id = ++productsData.lastPrId;
      productsData.products = [...productsData.products, this];
    }
    writeDataFile(productsData);
    return this;
  }

  static getAllProducts() {
    const data = readDataFile();
    if (!data?.products) throw error("No Product Found");
    return data.products;
  }

  static getProduct(id) {
    const data = readDataFile();
    const product = data.products.find((p) => p.id === id);
    if (!product) throw Error("No Product Found");
    return product;
  }

  static deleteProduct(id) {
    const productsData = readDataFile();
    productsData.products = productsData.products.filter(
      (prd) => prd.id !== id
    );
    writeDataFile(productsData);
  }
}

module.exports = Product;
