const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){

    //Rotas de voo

    app.get('/rotas', function (req, res){

        res.render('lista/rotas-voo');

    });

    app.get('/rotas/cadastro', function (req, res){

        res.render('cadastro/cadastro_rota_voo');

    });

    app.get('/rotas/editar', function (req, res){

        res.render('editar/editar_rota_voo');

    });

}