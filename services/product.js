const faker = require('faker');
const boom = require("@hapi/boom");

class Product {

   constructor(size=10) {
    this.products = [];
    this.generate(size);
  }

  async generate(limit) {
    for (let size = 0; size < limit; size++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data) {
    const elementosValidos = [ 'name', 'price', 'image' ];
    Object.keys(data).forEach((key) => elementosValidos .includes(key) || delete data[key]);

    const newItem = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newItem);
    return newItem;
  }

  find() {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        resolve(this.products) ;
      },3500);
    });
  }

  async findById(id) {
    const product =  this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found.');
    }
    if (product.isBlock) {
      throw boom.conflict("product is block.");
    }
    return product;
  }

  async update(id, data) {
    const elemIdx = this.products.findIndex(elem => elem.id === id);

    if (elemIdx === -1) {
      throw new Error("product not found");
    }

    const elemChanged = {
      ...this.products[elemIdx],
      ...data
    };

    this.products[elemIdx] = elemChanged;
    return this.products[elemIdx];
  }

  async delete(id) {
    const elemIdx = this.products.findIndex(elem => elem.id === id);

    if (elemIdx === -1) {
      throw new Error("product not found");
    }
    this.products.splice(elemIdx, 1);
    return { id };
  }

}

module.exports = Product;
