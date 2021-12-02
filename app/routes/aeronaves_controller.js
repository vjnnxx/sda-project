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

        var companhias = [];
        let sql = 'SELECT * FROM itr_cmpn_aerea;'
        con.query(sql, (err,result)=>{

            if (err) throw err;

            for (x in result){
            
                companhias.push({nome: result[x].NM_CMPN_AEREA});
            }
            res.render('lista/aeronaves',{companhias:companhias});
        });

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