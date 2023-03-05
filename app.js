const express = require("express")

const app = express()
const PORT = "9000"

app.get('/', (req, res) => {
   res.status(200).json({
    "msg": "GoodLuck"
   })
})

app.listen(PORT, (req, res) => {
    console.log("Server started", PORT);
})