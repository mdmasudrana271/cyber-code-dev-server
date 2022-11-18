const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
const courses = require('./data/courses.json')

app.use(cors());

app.get('/', (req,res)=>{
    res.send('Hello I am running')
})

app.get('/courses', (req,res)=>{
    res.send(courses)
})

app.get('/courses/:id', (req,res)=>{
    const id = req.params.id;
    const course = courses.find(item => item.id == id)
    res.send(course)
})

app.listen(port, ()=>{
    console.log('port running on port: ', port);
})
