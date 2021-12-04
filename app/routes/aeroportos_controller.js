const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){

    app.get('/aeroportos', function (req, res){

        let sql = 'SELECT * FROM itr_arpt;';
        
        let resultados = [];
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                resultados.push(result[x]);
            }
            
            res.render('lista/aeroportos', {aeroportos:resultados});
        })
        
    
    });
    
    app.get('/aeroportos/cadastro', function (req, res){
    
        let sql = 'SELECT *  FROM itr_pais'; 
        let sql2 = 'SELECT * FROM itr_uf';

        let paises = [];
        let ufs = [];
        
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                paises.push(result[x]);
            }

            con.query(sql2, (err, result)=>{
                if (err) throw err;
    
                for (x in result){
                    ufs.push(result[x]);
                }
    
                res.render('cadastro/cadastro_aeroporto', {paises: paises, ufs: ufs});
            });
            
        });

    
    });

    app.post('/aeroportos/cadastrar', function(req,res){
        
        const cad = req.body;

        //console.log(cad);

        let uf = cad.sigla_uf == '' ? null : cad.sigla_uf;

        let sql = 'INSERT INTO itr_arpt ( CD_ARPT, CD_PAIS, SG_UF, NM_CIDADE ) VALUES (' + mysql.escape(cad.cod_aeroporto) + ', ' + mysql.escape(cad.cod_pais) + ', ' + mysql.escape(uf) + ', ' + mysql.escape(cad.nome_cidade) + ');';

        con.query(sql, (err, result)=>{
            if (err) throw err;

            console.log('Aeroporto cadastrado com sucesso!');
        
            res.redirect('/aeroportos');
        });
    });
    
    app.get('/aeroportos/editar', function (req, res){
    
        res.render('editar/editar_aeroporto');
    
    });

    app.get('/aeroportos/busca', function (req, res){

        let busca = req.query.busca;

        //console.log(req.query)
        
        sql = `SELECT * FROM itr_arpt WHERE CD_ARPT LIKE '%` + busca + `%' ;` ;

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
    
    app.get('/aeroportos/verificarId', function(req, res){

        let cod = req.query.cod;
        
        let sql = 'SELECT * FROM itr_arpt WHERE CD_ARPT = ' + mysql.escape(cod) + ';';

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