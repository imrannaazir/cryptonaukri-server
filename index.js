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
        const accountCollection = client.db("crypto").collection("account");
        const jobCollection = client.db("crypto").collection("jobs");
        const applicationCollection = client.db("crypto").collection("applications");


        //post api for account
        app.post('/account', async (req, res) => {
            const newApplicant = req.body;
            const result = await applicantCollection.insertOne(newApplicant);
            res.send(result);
        })
        //post api for jobs
        app.post('/jobs', async (req, res) => {
            const newJob = req.body;
            const result = await jobCollection.insertOne(newJob);
            res.send(result);
        })
        //post api for applications
        app.post('/applications', async (req, res) => {
            const newApplication = req.body;
            const application = await applicationCollection.insertOne(newApplication);
            res.send(application);
        })
        //get all jobs  api
        app.get('/jobs', async (req, res) => {
            const jobs = await jobCollection.find({}).toArray();
            res.send(jobs);
        });
        //get a account  api
        app.get('/account/:email', async (req, res) => {
            const email = req.params.email
            const query = { email: email }
            const user = await applicantCollection.findOne(query);
            res.send(user);
        });
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