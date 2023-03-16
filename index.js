const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const routerr = require("./server/routes/cause_routes");
const auth_router = require("./server/routes/register_route");
const dotenv = require('dotenv').config()

const { MongoClient } = require('mongodb');

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// set up dependencies
const app = express();
const PORT = process.env.PORT || "7000"
app.use(cors(), (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "application/json");
    next()
  })
app.use(express.urlencoded({ extended: true }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

// // set up mongoose

// mongoose.connect(process.env.MONGODB)
mongoose.connect(process.env.MONGODB)
.then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database', error);
  }
);

mongoose.Promise = global.Promise

// async function main(){
//   /**
//   * Connection URI. Update , <password>, and <your-cluster-url> to reflect your cluster.
//   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//   */
//   const uri = "mongodb+srv://samtennyson707:yahOO%40123@cluster0.qx7vhfd.mongodb.net/?retryWrites=true&w=majority";
//    const client = new MongoClient(uri);
  
//     try {
//       // Connect to the MongoDB cluster
//       await client.connect();
    
//       // Make the appropriate DB calls
//       await  listDatabases(client);
    
//    } catch (e) {
//       console.error(e);
//    } finally {
//       await client.close();
//     }
//   }
 
//  main().catch(console.error);
 

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