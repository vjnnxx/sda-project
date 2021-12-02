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
        let sql = 'SELECT * FROM itr_pais;';
        
        let resultados = [];
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                resultados.push(result[x]);
            }
            
            res.render('lista/paises', {paises: resultados});
       
        });
    });

    app.get('/paises/cadastro', function (req, res){

        res.render('cadastro/cadastro_pais');

    });

    app.get('/paises/editar', function (req, res){

        res.render('editar/editar_pais');

    });

    app.get('/paises/busca', function(req,res){

        let busca = req.query.busca;

        //console.log(req.query)
        
        sql = `SELECT * FROM itr_pais WHERE CD_PAIS = '` + busca + `' ;` ;

        var resultados = [];

        con.query(sql, (err, result)=>{
            if (err) throw err;
            
            
            for (x in result){
                resultados.push(result[x]);
            }
                //res.render('lista/passageiros', {passageiros: resultados});
            
                res.send(resultados);

            });
    });

}