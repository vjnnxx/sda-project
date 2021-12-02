const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){

    app.get('/companhias', function (req, res){

        var paises = [];
        let sql = 'SELECT * FROM itr_pais;'
        con.query(sql, (err,result)=>{

            if (err) throw err;

            for (x in result){
            
                paises.push({nome: result[x].NM_PAIS});
            }
            res.render('lista/companhias',{paises:paises});
        });


        
    
    });
    
    app.get('/companhias/cadastro', function (req, res){
    
        res.render('cadastro/cadastro_companhia');
    
    });
    
    app.get('/companhias/editar', function (req, res){
    
        res.render('editar/editar_companhia');
    
    });

};