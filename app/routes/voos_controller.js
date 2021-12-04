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
    
        
        let resultados = [];
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                resultados.push(result[x]);
            }

            
            
            res.render('lista/voos', {voos: resultados});
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

    

    app.get('/voos/editar', function (req, res){

        res.render('editar/editar_voo');

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

    app.get('/voos/getData', function (req, res){

        console.log(req.query.nr_rota);

        let codigo = req.query.nr_rota;

        let sql = 'SELECT DT_SAIDA_VOO FROM itr_voo WHERE NR_VOO = ' + mysql.escape(codigo) + ';'; //pega todos os voos

        var resultado;
    
        con.query(sql, (err, result)=>{
            if (err) throw err;

              
                 
            
            res.send(result);
        })
        
        

    });
}