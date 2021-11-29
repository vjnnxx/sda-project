const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){

    app.get('/aeroportos', function (req, res){

        res.render('lista/aeroportos');
    
    });
    
    app.get('/aeroportos/cadastro', function (req, res){
    
        res.render('cadastro/cadastro_aeroporto');
    
    });
    
    app.get('/aeroportos/editar', function (req, res){
    
        res.render('editar/editar_aeroporto');
    
    });

}