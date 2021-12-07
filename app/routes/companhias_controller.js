const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){

    app.get('/companhias', function (req, res){

        var paises = [];
        let sql = 'SELECT * FROM itr_pais;'
        let sql2 = 'SELECT * FROM itr_cmpn_aerea;';
        let companhias = [];

        con.query(sql, (err,result)=>{

            if (err) throw err;

            for (x in result){
            
                paises.push({nome: result[x].NM_PAIS});
            }
            
            
            con.query(sql2, (err, result)=>{
                if (err) throw err;

                for (x in result){
                    companhias.push(result[x]);
                }
            
                res.render('lista/companhias',{paises:paises, companhias:companhias});
            })
            
        });

        

        
    
    });
    
    app.get('/companhias/cadastro', function (req, res){

        var paises = [];
        let sql = 'SELECT * FROM itr_pais;'
        con.query(sql, (err,result)=>{

            if (err) throw err;

            for (x in result){
            
                paises.push({codigo: result[x].CD_PAIS, nome: result[x].NM_PAIS});
            }

            
        
            
            res.render('cadastro/cadastro_companhia', {paises: paises});
        });
    
        
    
    });

    app.post('/companhias/cadastrar', function(req,res){
        
        const cad = req.body;

        //console.log(cad);

        let sql = 'INSERT INTO itr_cmpn_aerea ( CD_CMPN_AEREA, NM_CMPN_AEREA, CD_PAIS) VALUES (' + mysql.escape(cad.cod_companhia) + ', ' + mysql.escape(cad.nome) + ',' + mysql.escape(cad.pais) + ');';

        con.query(sql, (err, result)=>{
            if (err) throw err;

            console.log('Companhia Aerea cadastrado com sucesso!');
        
            res.redirect('/companhias');
        });
    });
    
    app.get('/companhias/editar/:id', function (req, res){

        const id = req.params.id;

        var paises = [];
        let sql = 'SELECT * FROM itr_pais;'
        con.query(sql, (err,result)=>{

            if (err) throw err;

            for (x in result){
            
                paises.push({codigo: result[x].CD_PAIS, nome: result[x].NM_PAIS});
            }

            let sql2 = 'SELECT * FROM itr_cmpn_aerea WHERE CD_CMPN_AEREA =' + mysql.escape(id) + ';';
            con.query(sql2, (err, result)=>{
                if (err) throw err;

                res.render('editar/editar_companhia', {paises: paises, companhia: result});
            });
            
            
        });   
    
    });

    app.post('/companhias/editar/atualizar/:id', function(req,res){
        
        const id = req.params.id;

        const cad = req.body;

        console.log(cad)
        let sql = 'UPDATE itr_cmpn_aerea SET NM_CMPN_AEREA = ' + mysql.escape(cad.nome) + ', CD_PAIS = ' + mysql.escape(cad.cod_pais) +  'WHERE CD_CMPN_AEREA = ' + mysql.escape(id) + ';';

        con.query(sql, (err, result)=>{
            if (err) throw err;
            
            console.log('Linhas afetadas: ' + result.affectedRows);
        
        });
        
        res.redirect('/companhias');
    });

    app.post('/companhias/editar/deletar/:id', function(req, res){
      
        const id = req.params.id;

        let sql = 'DELETE FROM itr_cmpn_aerea WHERE CD_CMPN_AEREA =' + mysql.escape(id) + ';' ;

        con.query(sql, (err, result)=>{
            if (err) throw err;
                
            //console.log('Linhas afetadas: ' + result.affectedRows);
            res.send('Companhia deletada com sucesso!');
            
        });

    });

    app.get('/companhias/busca', function (req, res){

        let busca = req.query.busca;

        //console.log(req.query)
        
        sql = `SELECT * FROM itr_cmpn_aerea WHERE NM_CMPN_AEREA LIKE '%` + busca + `%' ;` ;

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

    app.get('/companhias/verificarId', function(req, res){

        let cod = req.query.cod;
        
        let sql = 'SELECT * FROM itr_cmpn_aerea WHERE CD_CMPN_AEREA = ' + mysql.escape(cod) + ';';

        con.query(sql, (err, result)=>{
            if (err) throw err;

            if(result == ''){
                res.send('Código disponível')
            } else {
                res.status(500).send({ error: 'something blew up' })
            }
        });
    });
};