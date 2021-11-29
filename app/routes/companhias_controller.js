const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){

    app.get('/companhias', function (req, res){

        res.render('lista/companhias');
    
    });
    
    app.get('/companhias/cadastro', function (req, res){
    
        res.render('cadastro/cadastro_companhia');
    
    });
    
    app.get('/companhias/editar', function (req, res){
    
        res.render('editar/editar_companhia');
    
    });

};