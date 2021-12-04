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

    app.post('/paises/cadastrar', function(req,res){
        
        const cad = req.body;

        //console.log(cad);

        let sql = 'INSERT INTO itr_pais ( CD_PAIS, NM_PAIS, QT_PPLC_PAIS) VALUES (' + mysql.escape(cad.cod_pais) + ', ' + mysql.escape(cad.nome_pais) + ', ' + mysql.escape(cad.quant_pop) + ');';

        con.query(sql, (err, result)=>{
            if (err) throw err;

            console.log('País cadastrado com sucesso!');
        
            res.redirect('/paises');
        });
    });

    app.get('/paises/editar', function (req, res){

        res.render('editar/editar_pais');

    });

    app.get('/paises/busca', function(req,res){

        let busca = req.query.busca;

        //console.log(req.query)
        
        sql = `SELECT * FROM itr_pais WHERE NM_PAIS LIKE '%` + busca + `%' ;` ;

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

    app.get('/paises/verificarId', function(req, res){

        let cod = req.query.cod;
        
        let sql = 'SELECT * FROM itr_pais WHERE CD_PAIS = ' + mysql.escape(cod) + ';';

        con.query(sql, (err, result)=>{
            if (err) throw err;

            if(result == ''){
                res.send('Código disponível')
            } else {
                res.status(500).send({ error: 'something blew up' })
            }
        });
    });

}