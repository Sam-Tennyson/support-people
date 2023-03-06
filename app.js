const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const routerr = require("./server/routes/cause_routes");
const sign_up_router = require("./server/routes/register_route");
const auth_router = require("./server/routes/register_route");


// // set up dependencies
const app = express();
const PORT = "9000"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // set up mongoose
mongoose.connect('mongodb://localhost:27017/supportPeople')
// mongoose.connect('mongodb+srv://cluster0.qx7vhfd.mongodb.net/myFirstDatabas')
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  }
);

mongoose.Promise = global.Promise

app.get('/', (req, res) => {
   res.status(200).json({
    "msg": "GoodLuck"
   })
})

// // set up route
// app.use('/api/', routerr);
app.use('/auth/', auth_router);

app.listen(PORT, (req, res) => {
    console.log("Server started", PORT);
})