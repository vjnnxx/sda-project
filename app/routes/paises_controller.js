const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){

    //Países
    app.get('/paises', function (req, res){

        res.render('lista/paises');

    });

    app.get('/paises/cadastro', function (req, res){

        res.render('cadastro/cadastro_pais');

    });

    app.get('/paises/editar', function (req, res){

        res.render('editar/editar_pais');

    });

}