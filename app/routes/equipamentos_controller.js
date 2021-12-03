const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){
    //Equipamentos
    app.get('/equipamentos', function (req, res){

        let sql = 'SELECT * FROM itr_eqpt;';
        
        let resultados = [];
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                resultados.push(result[x]);
            }
            
            res.render('lista/equipamentos', {equipamentos: resultados});
        })
        
        

    });

    app.get('/equipamentos/cadastro', function (req, res){

        res.render('cadastro/cadastro_equipamento');

    });

    app.get('/equipamentos/editar', function (req, res){

        res.render('editar/editar_equipamento');

    });

    app.get('/equipamentos/busca', function (req, res){

        let busca = req.query.busca;

        //console.log(req.query)
        
        sql = `SELECT * FROM itr_eqpt WHERE CD_EQPT LIKE '%` + busca + `%' ;` ;

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