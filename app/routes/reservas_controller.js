const mysql = require('mysql');


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){

    //Reservas 
    app.get('/reservas', function (req, res){

        let sql = 'SELECT * FROM itr_resv;';
        
        let resultados = [];
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                resultados.push(result[x]);
            }
            
            res.render('lista/reservas', {reservas: resultados,passageiros: passageiros});
        })

        let sql2 = 'SELECT * FROM itr_psgr;';
        let passageiros = [];
        con.query(sql2, (err, result)=>{
            if (err) throw err;

            for (x in result){
                    passageiros.push(result[x]);
            }
            
            
        })


    });

    app.get('/reservas/cadastro', function (req, res){

        let sql = 'SELECT * FROM itr_voo;'; //pega todos os voos
    
        
        let resultados = [];
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                resultados.push(result[x]);
            }

            
            
            res.render('cadastro/cadastro_reserva', {voos: resultados});
        })

    });


    app.post('/reservas/cadastrar', function (req, res){

        //console.log(req.body);
        
        let data = req.body;

        let sql = 'INSERT INTO itr_resv (CD_PSGR, NR_VOO, DT_SAIDA_VOO, PC_DESC_PASG) VALUES (' + mysql.escape(data.codigo_passageiro) + ', ' + mysql.escape(data.codigo_voo) + ', ' + mysql.escape(data.data_saida) + ', ' + mysql.escape(data.desconto) + ');';
        
        con.query(sql, (err, result)=>{
            if (err) return err;

            console.log('Reserva feita com sucesso!')

            res.send({success: 'Reserva feita com sucesso!'});
        });
        
        console.log(req.body);

    });

    app.get('/reservas/editar', function (req, res){

        res.render('editar/editar_reserva');

    });
    app.get('/reservas/busca', function (req, res){

        let busca = req.query.busca;

        //console.log(req.query)
        
        sql = `SELECT * FROM itr_resv WHERE CD_PSGR =` + busca + ` ;` ;

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