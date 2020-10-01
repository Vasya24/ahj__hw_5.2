import Product from './Product';

export default class ProductStorage {
  constructor() {
    this.products = [];
  }

  addProduct(name, price) {
    this.products.push(new Product(name, price));
  }
}
