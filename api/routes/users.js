const express = require("express");
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send("this is default users");
});

userRouter.get('/users/:id', (req, res) => {

});

userRouter.post('/users/create', (req, res) => {

});

module.exports = userRouter;


