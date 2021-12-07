const mysql = require('mysql');
const { response } = require('../../config/server');

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

        let sql = 'SELECT *  FROM itr_eqpt;'; 
        let sql2 = 'SELECT * FROM itr_cmpn_aerea;';

        let equipamentos = [];
        let companhias = [];
        
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                equipamentos.push(result[x]);
            }

            con.query(sql2, (err, result)=>{
                if (err) throw err;
    
                for (x in result){
                    companhias.push(result[x]);
                }
    
                res.render('cadastro/cadastro_aeronave', {equipamentos: equipamentos, companhias: companhias});
            });
            
        });


    });

    app.post('/aeronaves/cadastrar', function(req,res){

        const cad = req.body;

        //console.log(cad);

        let sql = 'INSERT INTO itr_arnv (CD_ARNV, CD_EQPT, CD_CMPN_AEREA ) VALUES (' + mysql.escape(cad.cod_aeronave) + ', ' + mysql.escape(cad.equipamento) + ', ' + mysql.escape(cad.companhia) + ');';

        con.query(sql, (err, result)=>{
            if (err) throw err;

            console.log('Aeronave cadastrado com sucesso!');
        
            res.redirect('/aeronaves');
        });
    }); 

    app.get('/aeronaves/editar/:id', function (req, res){

        const id = req.params.id;

        let sql = 'SELECT *  FROM itr_eqpt;'; 
        let sql2 = 'SELECT * FROM itr_cmpn_aerea;';

        let equipamentos = [];
        let companhias = [];
        
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                equipamentos.push(result[x]);
            }

            con.query(sql2, (err, result)=>{
                if (err) throw err;
    
                for (x in result){
                    companhias.push(result[x]);
                }

                let sql3 = 'SELECT * FROM itr_arnv WHERE CD_ARNV = ' + mysql.escape(id) + ';';
                con.query(sql3, (err, result)=>{
                    if (err) throw err;
                    
            
                        res.render('editar/editar_aeronave', {aeronave: result, equipamentos: equipamentos, companhias: companhias});
                    });
    
                
            });
            
        });
    });

    app.post('/aeronaves/editar/atualizar/:id', function(req,res){

        const id = req.params.id;

        const data = req.body;

        console.log(data);

        let sql = 'UPDATE itr_arnv SET CD_EQPT =' + mysql.escape(data.equipamento) + ', CD_CMPN_AEREA =' + mysql.escape(data.companhia) + ' WHERE CD_ARNV =' + mysql.escape(id) + ';';

        con.query(sql, (err, result)=>{
            if (err) throw err;

            console.log('Linhas afetadas: ' + result.affectedRows);

            res.redirect('/aeronaves');
        })
        
    });

    app.post('/aeronaves/editar/deletar/:id', function(req, res){

        const id = req.params.id;
        
        let sql = 'DELETE FROM itr_arnv WHERE CD_ARNV =' + mysql.escape(id) + ';' ;

            con.query(sql, (err, result)=>{
                if (err) throw err;
                
                //console.log('Linhas afetadas: ' + result.affectedRows);
                res.send('Aeronave deletada com sucesso');
            
            });

        
        //res.send('Ta deletado doidao, id: ' + req.params)
        
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

    app.get('/aeronaves/verificarId', function(req, res){

        let cod = req.query.cod;
        
        let sql = 'SELECT * FROM itr_arnv WHERE CD_ARNV = ' + mysql.escape(cod) + ';';

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