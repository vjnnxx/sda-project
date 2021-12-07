const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){

    //Rotas de voo

    app.get('/rotas', function (req, res){

        let sql = 'SELECT * FROM itr_rota_voo;';
        
        let resultados = [];
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                resultados.push(result[x]);
            }
            
            res.render('lista/rotas-voo', {rotas: resultados});
        })

    });

    app.get('/rotas/cadastro', function (req, res){

        let sql = 'SELECT * FROM itr_arpt;'; //pega todos os voos
    
        
        let resultados = [];
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                resultados.push(result[x]);
            }

            
            
            res.render('cadastro/cadastro_rota_voo', {aeroportos: resultados});
        })

    });

    app.post('/rotas/cadastrar', function(req,res){
        
        const cad = req.body;

        //console.log(cad);

        let sql = 'INSERT INTO itr_rota_voo ( CD_ARPT_ORIG, CD_ARPT_DEST, VR_PASG) VALUES (' + mysql.escape(cad.cod_origem) + ', ' + mysql.escape(cad.cod_dest) + ', ' + mysql.escape(cad.val_passagem) + ');';

        con.query(sql, (err, result)=>{
            if (err) throw err;

            console.log('Rota de voo cadastrado com sucesso!');
        
            res.redirect('/rotas');
        });
    });

    app.get('/rotas/editar/:id', function (req, res){

        let sql = 'SELECT * FROM itr_arpt;';

        const id = req.params.id;

        let resultados = [];
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                resultados.push(result[x]);
            }

            sql2 = 'SELECT * FROM itr_rota_voo WHERE NR_ROTA_VOO = ' + mysql.escape(id) + ';';
            con.query(sql2, (err,result)=>{
                if (err) throw err;

                res.render('editar/editar_rota_voo', {aeroportos: resultados, rota: result});

            });
        
        });

    });

    app.post('/rotas/editar/atualizar/:id', function(req, res){
        
        const id = req.params.id;

        const data = req.body;
        
        let sql = 'UPDATE itr_rota_voo SET CD_ARPT_ORIG = ' + mysql.escape(data.cod_origem) + ', CD_ARPT_DEST = ' + mysql.escape(data.cod_dest) + ', VR_PASG = ' + mysql.escape(data.val_passagem) + 'WHERE NR_ROTA_VOO = ' + mysql.escape(id) + ';';

        con.query(sql, (err, result)=>{
            if (err) throw err;
            
            console.log('Linhas afetadas: ' + result.affectedRows);
        
        });
        
        res.redirect('/rotas'); 
    });

    app.post('/rotas/editar/deletar/:id', function(req, res){
      
        const id = req.params.id;

        let sql = 'DELETE FROM itr_rota_voo WHERE NR_ROTA_VOO =' + mysql.escape(id) + ';' ;

        con.query(sql, (err, result)=>{
            if (err) throw err;
                
            //console.log('Linhas afetadas: ' + result.affectedRows);
            res.send('Rota de voo deletada com sucesso');
            
        });

    });

    app.get('/rotas/busca', function (req, res){

        let busca = req.query.busca;

        //console.log(req.query)
        
        sql = `SELECT * FROM itr_rota_voo WHERE NR_ROTA_VOO = ` + busca + ` ;` ;

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

     app.get('/rotas/filtro', function (req, res){

        let sql = `SELECT * FROM ((itr_rota_voo INNER JOIN itr_voo ON itr_rota_voo.NR_ROTA_VOO = itr_voo.NR_ROTA_VOO )INNER JOIN itr_resv ON itr_voo.NR_VOO = itr_resv.NR_VOO); `

        //let sql = `SELECT * FROM itr_voo INNER JOIN itr_resv ON itr_voo.NR_VOO = itr_resv.NR_VOO;` ;

        //let sql2 = `SELECT * FROM itr_rota_voo INNER JOIN itr_voo ON itr_rota_voo.NR_ROTA_VOO = itr_voo.NR_ROTA_VOO ;`;
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