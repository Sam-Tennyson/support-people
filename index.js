const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const routerr = require("./server/routes/cause_routes");
const auth_router = require("./server/routes/register_route");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require('dotenv').config()

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
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


// set up mongoose
mongoose.connect('mongodb://127.0.0.1:27017/supportPeople', { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.connect(process.env.MONGODB)
.then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database', error);
  }
);

mongoose.Promise = global.Promise

// // set up route
app.use('/api/', routerr);
app.use('/auth/', auth_router);
app.post('/upload', upload.single('file'), function(req, res) {
  cloudinary.uploader.upload(req.file.path, function(error, result) {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      res.send({image_url: result.secure_url});
    }
  });
});

app.listen(PORT, (req, res) => {
    console.log("Server started", PORT);
})