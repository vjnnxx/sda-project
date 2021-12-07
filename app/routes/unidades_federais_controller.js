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

    app.post('/uf/cadastrar', function(req,res){
        
        const cad = req.body;

        //console.log(cad);

        let sql = 'INSERT INTO itr_uf ( SG_UF, NM_UF ) VALUES (' + mysql.escape(cad.sigla) + ', ' + mysql.escape(cad.nome) + ');';

        con.query(sql, (err, result)=>{
            if (err) throw err;

            console.log('UF cadastrado com sucesso!');
        
            res.redirect('/uf');
        });
    });

    app.get('/uf/editar/:id', function (req, res){

        const id = req.params.id;


        sql = 'SELECT * FROM itr_uf WHERE SG_UF = ' + mysql.escape(id) + ';';

        con.query(sql, (err, result)=>{
            if (err) throw err;
                
                res.render('editar/editar_uf', {uf: result});
            });

    });

    app.post('/uf/editar/atualizar/:id', function(req,res){

        const idPass = req.params.id;
        
        const data = req.body;

        let sql = 'UPDATE itr_uf SET NM_UF = UPPER ( ' + mysql.escape(data.nome) + ') WHERE SG_UF = ' + mysql.escape(idPass) + ';';

        con.query(sql, (err, result)=>{
            if (err) throw err;
            
            console.log('Número de linhas afetadas ' + result.affectedRows);
            res.redirect('/uf');
        });
        
    });

    app.post('/uf/editar/deletar/:id', function(req, res){
        const id = req.params.id;
       

        let sql = 'DELETE FROM itr_uf WHERE SG_UF = ' + mysql.escape(id) + ';'; 
        con.query(sql, (err, result)=>{
            if (err) throw err;
            
            //console.log('Linhas afetadas: ' + result.affectedRows);
            res.send('UF deletado com sucesso');
        
        });
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

    app.get('/uf/verificarId', function(req, res){

        let cod = req.query.cod;
        
        let sql = 'SELECT * FROM itr_uf WHERE SG_UF = ' + mysql.escape(cod) + ';';

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