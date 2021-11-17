const express = require('express');
const bodyParser = require('body-parser');
const {check}= require('express-validator');
const { Client } = require('pg');
const client = new Client();

var app = express();



app.set('view engine', 'html');
app.set('views', './app/views');

//var home = require('./app/routes/home');

app.get('/', function (req, res){

    res.sendFile('home.html', {root: './app/views'});

});




module.exports = app;