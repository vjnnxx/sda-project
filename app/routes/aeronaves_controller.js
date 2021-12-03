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

        let sql = 'SELECT * FROM itr_arnv;';
        
        let resultados = [];
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                resultados.push(result[x]);
            }
            
            res.render('lista/aeronaves', {aeronaves: resultados});
        })

    });

    app.get('/aeronaves/cadastro', function (req, res){

        res.render('cadastro/cadastro_aeronave');

    });

    app.get('/aeronaves/editar', function (req, res){

        res.render('editar/editar_aeronave');

    });


    app.get('/aeronaves/busca', function (req, res){

        let busca = req.query.busca;

        //console.log(req.query)
        
        sql = `SELECT * FROM itr_arnv WHERE CD_ARNV LIKE '%` + busca + `%' ;` ;

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
};