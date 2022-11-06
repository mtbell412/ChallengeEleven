//server.js is main file

const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');
const { v4: uuid } = require('uuid');

// const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

//creates express app
const app = express();

//middleware, executing methods found in express module 
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//configuration for server to respond to specific requests--client is browser and server is app 

// GET Route for homepage get method, slash method
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);

app.post('/api/notes', (req,res)=>{
    const data = {
        title: req.body.title,
        text: req.body.text,
        id: uuid()
    };
    db.push(data);
    fs.writeFile('db/db.json',JSON.stringify(db), ()=>{
        res.json(data);
    })
});

app.delete('/api/notes/:id', (req,res)=>{
    const id = req.params.id;
    const arr = db.filter((obj)=>{
        return (obj.id != id);
    })
    fs.writeFile('db/db.json',JSON.stringify(arr), ()=>{
        res.json();
    })
});

//activates server to listen
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} `)
);
