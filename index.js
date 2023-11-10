const express = require("express");
const routerApi = require("./routes");
const cors = require("cors");
const { errorHandler, errorLog, boomHander } = require("./middlewares/errorHandler");

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whiteList = ['https://localhost:8080.', 'https://myapp.co'];

const coreOpts = {
  origin: (origin, callback) =>{
    if (whiteList.includes(origin)) {
      callback(null, true);
    }
    callback(new Error("don't allowed"));
  }
};
app.use(cors(coreOpts));


app.get('/', (req, res) => {
  res.send('Hola mundo');
});

routerApi(app);
app.use(errorLog);
app.use(boomHander);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server in port: ${port} online.`);
});
