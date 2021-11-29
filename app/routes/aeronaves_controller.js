const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){
    //Aeronaves
    app.get('/aeronaves', function (req, res){

        res.render('lista/aeronaves');

    });

    app.get('/aeronaves/cadastro', function (req, res){

        res.render('cadastro/cadastro_aeronave');

    });

    app.get('/aeronaves/editar', function (req, res){

        res.render('editar/editar_aeronave');

    });

    //Aeroportos
    app.get('/aeroportos', function (req, res){

        res.render('lista/aeroportos');

    });

    app.get('/aeroportos/cadastro', function (req, res){

        res.render('cadastro/cadastro_aeroporto');

    });

    app.get('/aeroportos/editar', function (req, res){

        res.render('editar/editar_aeroporto');

    });
};