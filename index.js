const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
require("dotenv").config();
const courses = require('./data/courses.json')

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8tifwil.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run(){
    try{

        const coursesCollection = client.db("cybercodedev").collection("courses");
        const teamCollection = client.db("cybercodedev").collection("team");


        app.get('/courses', async(req,res)=>{
            const query = {};
            const courses = await coursesCollection.find(query).toArray()
            res.send(courses)
        })
        
        app.get('/courses/:id', async(req,res)=>{
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await coursesCollection.findOne(query);
            res.send(result);
        })

        app.get('/team', async(req,res)=>{
            const query = {};
            const team = await teamCollection.find(query).toArray()
            res.send(team)
        })
    }
    finally {
    }
}

run().catch((error) => {
    console.log(error.message);
  });

app.get('/', (req,res)=>{
    res.send('Hello I am running')
})

app.listen(port, ()=>{
    console.log('port running on port: ', port);
})
