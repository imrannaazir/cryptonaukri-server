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


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.geuva.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const applicantCollection = client.db("crypto").collection("applicants");


        //post api for applicants
        app.post('/applicants', async (req, res) => {
            const newApplicant = req.body;
            const result = await applicantCollection.insertOne(newApplicant);
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(console.dir)

//root api
app.get("/", (req, res) => {
    res.send("Hello browser!")
})

//listen
app.listen(port, () => {
    console.log("that's sound great!");
})