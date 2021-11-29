const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){

    //Unidades federais
    app.get('/uf', function (req, res){

        res.render('lista/uf');

    });

    app.get('/uf/cadastro', function (req, res){

        res.render('cadastro/cadastro_uf');

    });

    app.get('/uf/editar', function (req, res){

        res.render('editar/editar_uf');

    });

}