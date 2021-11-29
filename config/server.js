const express = require('express');
const bodyParser = require('body-parser');
const {check, Result}= require('express-validator');
const mysql = require('mysql');
var consign = require('consign');


var app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//Estabelece conexão com o banco de dados

//const con = require('../config/dbConnection.js');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });


app.set('view engine', 'ejs');
app.set('views', './app/views');

//var home = require('./app/routes/home');

consign()
    .include('app/routes')
    .into(app);


app.get('/', function (req, res){

    res.render('home', {message: ''});

});

module.exports = app;