const express = require('express');
const logger = require('morgan');
const bodyParser  = require('body-parser');
const cors = require('cors');
const app = express();
var mongoose = require("mongoose");

const port = 3000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
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



app.get('/', (req, res) => {
    client_debt.find(function(err,docs){
        if(err){
            res.sendStatus(404)
        }
        res.json({docs})
    })
})
app.post('/', (req, res) => {
    if(req.body){
        var name = req.body.customer
        var debt = req.body.debt
        var person = {name: name, debt: debt}
        exports.person = person
        var newDoc = new client_debt({name: name, amount_owed: debt})
        newDoc.save()
        res.status(200).send()
    }
    else
        res.status(404).json({'message': 'error'})
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))