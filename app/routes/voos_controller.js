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
        let sql = 'SELECT * FROM itr_voo;'; //pega todos os voos
        let sql2 = 'SELECT * FROM itr_arpt;'
        
        let resultados = [];
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                resultados.push(result[x]);
            }

            
            
            
        })
        let resultados2 = [];
        con.query(sql2, (err, result)=>{
            if (err) throw err;

            for (x in result){
                resultados2.push(result[x]);
            }

            
            
            res.render('lista/voos', {voos: resultados,aeroportos:resultados2});
        })
        

    });

    app.get('/voos/cadastro', function (req, res){

        let sql = 'SELECT *  FROM itr_rota_voo'; 
        let sql2 = 'SELECT * FROM itr_arnv';

        let rotas = [];
        let aeronaves = [];
        
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                rotas.push(result[x]);
            }

            con.query(sql2, (err, result)=>{
                if (err) throw err;
    
                for (x in result){
                    aeronaves.push(result[x]);
                }
    
                res.render('cadastro/cadastro_voo', {rotas: rotas, aeronaves: aeronaves});
            });
            
        });

        


    });

    app.post('/voos/cadastrar', function(req,res){
        
        const cad = req.body;

        //console.log(cad);

        let sql = 'INSERT INTO itr_voo ( NR_VOO, DT_SAIDA_VOO, NR_ROTA_VOO, CD_ARNV ) VALUES (' + mysql.escape(cad.num_voo) + ', ' + mysql.escape(cad.data_saida) + ', ' + mysql.escape(cad.rota) + ', ' + mysql.escape(cad.aeronave) + ');';

        con.query(sql, (err, result)=>{
            if (err) throw err;

            console.log('Voo cadastrado com sucesso!');
        
            res.redirect('/voos');
        });
    });

    

    app.get('/voos/editar/:id', function (req, res){

        const id = req.params.id;
        aux = id.split('_');
        num = aux[0];
        data=aux[1].replace(',','/');
        data=data.replace(',','/');
        
        

        sql = 'SELECT * FROM itr_voo WHERE NR_VOO = ' + mysql.escape(num) + ' AND DT_SAIDA_VOO = ' + mysql.escape(data) + ';';


        con.query(sql, (err, result)=>{
        if (err) throw err;
        

            res.render('editar/editar_voo', {voo: result});
        });

    });

    app.post('/voos/editar/atualizar/:id', function(req,res){
        
        const id = req.params.id;
        aux = id.split('_');
        num = aux[0];
        data=aux[1].replace(',','/');
        data=data.replace(',','/');

        const cad = req.body;
        
        let sql = 'UPDATE itr_voo SET NR_ROTA_VOO =' + mysql.escape(cad.cod_rota_voo) +', CD_ARNV = ' + mysql.escape(cad.cod_aeronave)  + ' WHERE NR_VOO = ' + mysql.escape(num) + ' AND DT_SAIDA_VOO = ' + mysql.escape(data) + ';';

        con.query(sql, (err, result)=>{
            if (err) throw err;
            
            console.log('Número de linhas afetadas ' + result.affectedRows);
        });

        res.redirect('/voos');
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

    app.post('/voos/editar/deletar/:id', function(req, res){
        const id = req.params.id;
        aux = id.split('_');
        num = aux[0];
        data=aux[1].replace(',','/');
        data=data.replace(',','/');
        

        let sql = 'DELETE FROM itr_voo WHERE NR_VOO = ' + mysql.escape(num) + 'AND DT_SAIDA_VOO =' + mysql.escape(data) + ';'; 
        con.query(sql, (err, result)=>{
            if (err) throw err;
            
            //console.log('Linhas afetadas: ' + result.affectedRows);
            res.send('Voo deletado com sucesso');
        
        });
    });

    app.get('/voos/getData', function (req, res){

       

        let codigo = req.query.nr_rota;

        let sql = 'SELECT DT_SAIDA_VOO FROM itr_voo WHERE NR_VOO = ' + mysql.escape(codigo) + ';'; //pega todos os voos

        var resultado;
    
        con.query(sql, (err, result)=>{
            if (err) throw err;

              
                 
            
            res.send(result);
        })
        
        

    });


    app.get('/voos/filtro', function(req, res){

        const origem = req.query.origem;
        
        let sql = "SELECT * FROM itr_voo INNER JOIN itr_rota_voo ON itr_rota_voo.NR_ROTA_VOO = itr_voo.NR_ROTA_VOO WHERE itr_rota_voo.CD_ARPT_ORIG = "+ mysql.escape(origem) + ";";

        var resultados = [];

        con.query(sql, (err, result)=>{
        if (err) throw err;
        
        
        for (x in result){
            resultados.push(result[x]);
        }
            
           
            res.send(resultados);

        });
        
    });
    
}