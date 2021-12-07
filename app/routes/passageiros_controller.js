
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){
    
    //Passageiros
    app.get('/passageiros', function (req, res){
        
        
        let sql = 'SELECT * FROM itr_psgr;';
        
        let resultados = [];
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                resultados.push(result[x]);
            }
            
            res.render('lista/passageiros', {passageiros: resultados});
        })
        

    });

    app.get('/passageiros/cadastro', function (req, res){
        
        var paises = [];
        let sql = 'SELECT * FROM itr_pais;'
        con.query(sql, (err,result)=>{

            if (err) throw err;

            for (x in result){
            
                paises.push({codigo: result[x].CD_PAIS, nome: result[x].NM_PAIS});
            }

            
        
            
            res.render('cadastro/cadastro_passageiro', {paises: paises});
        });

        

    });

    //Cadastrar passageiros
    app.post('/passageiros/cadastrar', function(req,res){

        const cad = req.body;

        //console.log(cad)

        let sql = 'SELECT CD_PSGR FROM itr_psgr WHERE NM_PSGR = UPPER(' + mysql.escape(cad.responsavel) + ');';

        con.query(sql, (err, result)=>{
            if (err) throw err;

            console.log(result)

            var codigoResponsavel;
            
            if(result[0]){
                codigoResponsavel = result[0].CD_PSGR;
            }
            
            
            sql = `INSERT INTO itr_psgr (NM_PSGR, IC_SEXO_PSGR, DT_NASC_PSGR, CD_PAIS,IC_ESTD_CIVIL,CD_PSGR_RESP) VALUES (` + mysql.escape(cad.nome.toUpperCase()) + `,` + mysql.escape(cad.sexo) + `,` + mysql.escape(cad.data_nasc) + `,` + mysql.escape(cad.pais) + `,` + mysql.escape(cad.estado_civil) + `,` + mysql.escape(codigoResponsavel) + `);`;
            
            con.query(sql, (err,result)=>{
                if (err) throw err;
                
                console.log('Passageiro cadastrado com sucesso!');
        
                res.redirect('/passageiros');
            });
            
        });
    
        
    });

    //Editar passageiro

    app.get('/passageiros/editar/:id', function (req, res){

        const id = req.params.id;


        var paises = [];
        let sql = 'SELECT * FROM itr_pais;'
        con.query(sql, (err,result)=>{

            if (err) throw err;

            for (x in result){
            
                paises.push({codigo: result[x].CD_PAIS, nome: result[x].NM_PAIS});
            }
        });

        sql = 'SELECT * FROM itr_psgr WHERE CD_PSGR = ' + mysql.escape(id) + ';';

        con.query(sql, (err, result)=>{
        if (err) throw err;
        

            res.render('editar/editar_passageiro', {passageiro: result, paises: paises});
        });
        
    });

    //Confirmar atualização

    app.post('/passageiros/editar/atualizar/:id', function(req,res){

        const idPass = req.params.id;
        
        const data = req.body;
        
        if(data.nome){
            let sql = 'UPDATE itr_psgr SET NM_PSGR =' + mysql.escape(data.nome.toUpperCase()) + ' WHERE CD_PSGR = ' + mysql.escape(idPass) + ';';

            con.query(sql, (err, result)=>{
                if (err) throw err;
                
                console.log('Número de linhas afetadas ' + result.affectedRows);
            });
        }

        if(data.responsavel){

            let sql = 'SELECT CD_PSGR FROM itr_psgr WHERE NM_PSGR = UPPER(' + mysql.escape(data.responsavel) + ');';

            con.query(sql, (err, result)=>{
                if (err) throw err;

                var codigoResponsavel;
                
                if(result[0]){
                    codigoResponsavel = result[0].CD_PSGR;

                    sql = 'UPDATE itr_psgr SET CD_PSGR_RESP =' + mysql.escape(codigoResponsavel) + ' WHERE CD_PSGR = ' + mysql.escape(idPass) + ';';

                    con.query(sql, (err, result)=>{
                        if (err) throw err;
                        
                        console.log('Número de linhas afetadas: ' + result.affectedRows);
                    });
                }
                
                
            });

            
        }

        if(data.data_nasc){
            let sql = 'UPDATE itr_psgr SET DT_NASC_PSGR =' + mysql.escape(data.data_nasc) + ' WHERE CD_PSGR = ' + mysql.escape(idPass) + ';';

            con.query(sql, (err, result)=>{
                if (err) throw err;
                
                console.log('Número de linhas afetadas ' + result.affectedRows);
            });
        }
        
        if(data.pais){
            let sql = 'UPDATE itr_psgr SET CD_PAIS =' + mysql.escape(data.pais) + ' WHERE CD_PSGR = ' + mysql.escape(idPass) + ';';

            con.query(sql, (err, result)=>{
                if (err) throw err;
                
                console.log('Número de linhas afetadas ' + result.affectedRows);
            });
        }
        if(data.sexo){
            let sql = 'UPDATE itr_psgr SET IC_SEXO_PSGR =' + mysql.escape(data.sexo) + ' WHERE CD_PSGR = ' + mysql.escape(idPass) + ';';

            con.query(sql, (err, result)=>{
                if (err) throw err;
                
                console.log('Número de linhas afetadas ' + result.affectedRows);
            });
        }
        if(data.estado_civil){
            let sql = 'UPDATE itr_psgr SET IC_ESTD_CIVIL =' + mysql.escape(data.estado_civil) + ' WHERE CD_PSGR = ' + mysql.escape(idPass) + ';';

            con.query(sql, (err, result)=>{
                if (err) throw err;
                
                console.log('Número de linhas afetadas ' + result.affectedRows);
            });
        }

        res.redirect('/');

    });

    //Deletar passageiro

    app.post('/passageiros/editar/deletar/:id', function(req, res){
        
        let sql = 'DELETE FROM itr_psgr WHERE CD_PSGR =' + mysql.escape(req.params.id) + ';' ;

            con.query(sql, (err, result)=>{
                if (err) throw err;
                
                //console.log('Linhas afetadas: ' + result.affectedRows);
                res.send('Passageiro deletado com sucesso');
            
            });

        
        //res.send('Ta deletado doidao, id: ' + req.params)
        
    });

    //Buscar passageiro

    app.get('/passageiros/busca', function (req, res){

        let busca = req.query.busca;

        //console.log(req.query)
        
        sql = `SELECT * FROM itr_psgr WHERE NM_PSGR LIKE '%` + busca + `%' ;` ;

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

    //Buscar nome responsável

    app.get('/passageiros/getResponsavel', function(req, res){

        var data = req.query;

        codigoResp = data.data;

        let sql = 'SELECT NM_PSGR FROM itr_psgr WHERE CD_PSGR = ' + mysql.escape(codigoResp) + ';';

        con.query(sql, (err,result)=>{
            if (err) throw err; 

            if(result[0]){
                res.send(result[0].NM_PSGR)
            } else {
                res.send('');
            }


        });

    });
};