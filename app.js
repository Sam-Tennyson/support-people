const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const routerr = require("./server/routes/cause_routes");


// // set up dependencies
const app = express();
const PORT = "9000"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // set up mongoose
mongoose.connect('mongodb://localhost:27017/supportPeople')
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

app.listen(PORT, (req, res) => {
    console.log("Server started", PORT);
})