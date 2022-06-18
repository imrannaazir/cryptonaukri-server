//declaration
const express = require('express');
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');
require("dotenv").config()
const jwt = require('jsonwebtoken');

//use middle ware
app.use(cors())
app.use(express.json())


//root api
app.get("/", (req, res) => {
    res.send("Hello browser!")
})

//listen
app.listen(port, () => {
    console.log("that's sound great!");
})