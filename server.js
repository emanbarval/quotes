const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const url = "mongodb://localhost:27017";

app.use(bodyParser.urlencoded({extended:true}));

MongoClient.connect(url, {useUnifiedTopology:true}, (err, db) => {
    let dbo = db.db("misQuotes");
    const quotesCollection = dbo.collection('quotes');

    app.post('/quotes', (req, res)=>{
        quotesCollection.insertOne(req.body);
        quotesCollection.find({}).toArray((err, result)=>{
            console.log(result);
        })
    })
    app.get('/', (req, res) => {
        quotesCollection.find({}).toArray().then( results => {
        res.render('index.ejs', {quotes: results})
        })
        
    })
})

app.listen(3000, () => {
    console.log("Puerto 3000");
})