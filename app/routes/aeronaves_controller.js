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