const express = require("express");
const faker = require("faker");
const productRouter = express.Router();
const productService = require("./../services/product");
const validatorHandler = require("../middlewares/validator");
const { createProductSchema, updateProductSchema, getProductSchema } = require("../schemas/product");

const service = new productService(50);

productRouter.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

productRouter.get('/filter', (req, res) => {
   res.send('This is a filter xD');
});

productRouter.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await service.findById(id);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
);

productRouter.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

productRouter.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  }
);

productRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteItem = await service.delete(id);
  res.json(deleteItem);
});

module.exports = productRouter;
