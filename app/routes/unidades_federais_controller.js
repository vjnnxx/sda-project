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
        
        let sql = 'SELECT * FROM itr_uf;';
        
        let resultados = [];
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                resultados.push(result[x]);
            }
            
            res.render('lista/uf', {unidades: resultados});
        })
        

    });

    app.get('/uf/cadastro', function (req, res){

        res.render('cadastro/cadastro_uf');

    });

    app.get('/uf/editar', function (req, res){

        res.render('editar/editar_uf');

    });

    app.get('/uf/busca', function(req,res){

        let busca = req.query.busca;

        //console.log(req.query)
        
        sql = `SELECT * FROM itr_uf WHERE NM_UF LIKE '%` + busca + `%' ;` ;

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