const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){

    app.get('/aeroportos', function (req, res){

        let sql = 'SELECT * FROM itr_arpt;';
        
        let resultados = [];
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                resultados.push(result[x]);
            }
            
            res.render('lista/aeroportos', {aeroportos:resultados});
        })
        
    
    });
    
    app.get('/aeroportos/cadastro', function (req, res){
    
        res.render('cadastro/cadastro_aeroporto');
    
    });
    
    app.get('/aeroportos/editar', function (req, res){
    
        res.render('editar/editar_aeroporto');
    
    });

    app.get('/aeroportos/busca', function (req, res){

        let busca = req.query.busca;

        //console.log(req.query)
        
        sql = `SELECT * FROM itr_arpt WHERE CD_ARPT LIKE '%` + busca + `%' ;` ;

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