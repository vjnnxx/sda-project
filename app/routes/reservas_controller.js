const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){

    //Reservas 
    app.get('/reservas', function (req, res){

        res.render('lista/reservas');

    });

    app.get('/reservas/cadastro', function (req, res){

        res.render('cadastro/cadastro_reserva');

    });

    app.get('/reservas/editar', function (req, res){

        res.render('editar/editar_reserva');

    });

}