const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){

    // Voos
    app.get('/voos', function (req, res){
        let sql = 'SELECT * FROM itr_voo;';
        
        let resultados = [];
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                resultados.push(result[x]);
            }
            
            res.render('lista/voos', {voos: resultados});
        })
        

    });

    app.get('/voos/cadastro', function (req, res){

        res.render('cadastro/cadastro_voo');

    });

    app.get('/voos/editar', function (req, res){

        res.render('editar/editar_voo');

    });

    app.get('/voos/busca', function (req, res){

        let busca = req.query.busca;

        //console.log(req.query)
        
        sql = `SELECT * FROM itr_voo WHERE NR_VOO = ` + busca + ` ;` ;

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