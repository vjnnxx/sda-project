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

    app.get('/rotas/editar', function (req, res){

        res.render('editar/editar_rota_voo');

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

}