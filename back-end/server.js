const express = require('express');
const logger = require('morgan');
const bodyParser  = require('body-parser');
const cors = require('cors');
const app = express();
var mongoose = require("mongoose");

const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(logger('dev'));
app.use(cors());
app.use(express.static('../front-end'))
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/client_debt");
var ObjectID = require('mongodb').ObjectID;
var debtSchema = new mongoose.Schema({
    name: String,
    amount_owed: String
   });

var client_debt = mongoose.model("client_debt", debtSchema);
var debt_doc = new client_debt({name: 'alex gimson', amount_owed: '$30'});

debt_doc.save(function(err,doc){
    if(err)
        console.log(err);
})

app.get('/', (req, res) => {
    client_debt.find(function(err,docs){
        if(err){
            res.sendStatus(404)
        }
        res.json({docs})
    })




})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))