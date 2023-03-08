const express = require("express");
const mongoose = require("mongoose");
const routerr = require("./server/routes/cause_routes");
const auth_router = require("./server/routes/register_route");
const dotenv = require('dotenv').config()

// set up dependencies
const app = express();
const PORT = "7000"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // set up mongoose
mongoose.connect(process.env.MONGODB)
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
app.use('/api/', routerr);
app.use('/auth/', auth_router);

app.listen(PORT, (req, res) => {
    console.log("Server started", PORT);
})