const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){

    // Voos
    app.get('/voos', function (req, res){

        res.render('lista/voos');

    });

    app.get('/voos/cadastro', function (req, res){

        res.render('cadastro/cadastro_voo');

    });

    app.get('/voos/editar', function (req, res){

        res.render('editar/editar_voo');

    });

}