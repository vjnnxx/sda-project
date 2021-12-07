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

    app.get('/paises/editar/:id', function (req, res){

        const id = req.params.id;

        sql = 'SELECT * FROM itr_pais WHERE CD_PAIS = ' + mysql.escape(id) + ';';

        con.query(sql, (err, result)=>{
            if (err) throw err;
                
                res.render('editar/editar_pais', {paises: result});
            });


    });

    app.post('/paises/editar/atualizar/:id', function(req,res){

        const idPass = req.params.id;
        
        const data = req.body;

        let sql = 'UPDATE itr_pais SET NM_PAIS = UPPER ( ' + mysql.escape(data.nome_pais) + '), QT_PPLC_PAIS =' + mysql.escape(data.quant_pop) + ' WHERE CD_PAIS = ' + mysql.escape(idPass) + ';';

        con.query(sql, (err, result)=>{
            if (err) throw err;
            
            console.log('Número de linhas afetadas ' + result.affectedRows);
            res.redirect('/paises');
        });
        
    });

    app.post('/paises/editar/deletar/:id', function(req, res){
        const id = req.params.id;
       

        let sql = 'DELETE FROM itr_pais WHERE CD_PAIS = ' + mysql.escape(id) + ';'; 
        con.query(sql, (err, result)=>{
            if (err) throw err;
            
            //console.log('Linhas afetadas: ' + result.affectedRows);
            res.send('País deletado com sucesso');
        
        });
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