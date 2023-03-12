const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const routerr = require("./server/routes/cause_routes");
const auth_router = require("./server/routes/register_route");
const dotenv = require('dotenv').config()

// set up dependencies
const app = express();
const PORT = "7000"
app.use(cors(), (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173/login");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "application/json");
    next()
  })
app.use(express.urlencoded({ extended: true }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

// // set up mongoose
mongoose.connect(process.env.MONGODB)
// mongoose.connect('mongodb+srv://cluster0.qx7vhfd.mongodb.net/myFirstDatabas')
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database', error);
  }
);

mongoose.Promise = global.Promise

// app.get("/", (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//   res.setHeader("Access-Control-Allow-Headers", "application/json");
//   next()
// });

// // set up route
app.use('/api/', routerr);
app.use('/auth/', auth_router);

app.listen(PORT, (req, res) => {
    console.log("Server started", PORT);
})