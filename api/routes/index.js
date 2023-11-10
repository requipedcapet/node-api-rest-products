const express = require("express");
const userRouter = require("./users");
const productRouter = require("./products");
const categoryRouter = require("./categories");
// import { shopingCart } from "./shoppingCart";

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', userRouter);
  router.use('/products', productRouter);
  router.use('/categories', categoryRouter);
}

module.exports = routerApi;

