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

    app.get('/reservas/editar/:id', function (req, res){

        const id = req.params.id;
        aux = id.split('_')
        cod_psgr = aux[0];
        num_voo = aux[1];
        data=aux[2].replace(',','/');
        data=data.replace(',','/');

        var voos = [];
        let sql = 'SELECT * FROM itr_voo;'
        con.query(sql, (err,result)=>{

            if (err) throw err;

            for (x in result){
            
                voos.push({num: result[x].NR_VOO});
            }
        });


        let sql2 = 'SELECT * FROM itr_resv WHERE CD_PSGR =' + mysql.escape(cod_psgr) + 'AND NR_VOO =' + mysql.escape(num_voo) + 'AND DT_SAIDA_VOO =' + mysql.escape(data) + ';'
        
        con.query(sql2, (err, result)=>{
            if (err) throw err;
            
    
                res.render('editar/editar_reserva', {reservas: result, voos:voos});
            });
    
    });

    app.post('/reservas/editar/atualizar/:id', function(req,res){
        
        const id = req.params.id;
        aux = id.split('_')
        cod_psgr = aux[0];
        num_voo = aux[1];
        data=aux[2].replace(',','/');
        data=data.replace(',','/');

        const cad = req.body;
        
        let sql = 'UPDATE itr_resv  SET PC_DESC_PASG = ' + mysql.escape(cad.desc_passagem)  + ' WHERE CD_PSGR = ' + mysql.escape(cod_psgr) + ' AND DT_SAIDA_VOO = ' + mysql.escape(data) + ' AND NR_VOO = ' + mysql.escape(num_voo) + ';';

        con.query(sql, (err, result)=>{
            if (err) throw err;
            
            console.log('Número de linhas afetadas ' + result.affectedRows);
        });

        res.redirect('/reservas');
    });

    app.post('/reservas/editar/deletar/:id', function(req, res){
      
        const id = req.params.id;
        aux = id.split('_')
        cod_psgr = aux[0];
        num_voo = aux[1];
        data=aux[2].replace(',','/');
        data=data.replace(',','/');

        let sql = 'DELETE FROM itr_resv WHERE CD_PSGR =' + mysql.escape(cod_psgr) + 'AND NR_VOO =' + mysql.escape(num_voo) +  'AND DT_SAIDA_VOO =' + mysql.escape(data) + ';' ;

        con.query(sql, (err, result)=>{
            if (err) throw err;
                
            //console.log('Linhas afetadas: ' + result.affectedRows);
            res.send('Reserva deletada com sucesso');
            
        });

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
    app.get('/reservas/filtro', function (req,res){
        let maior = req.query.maior;

        sql = 'SELECT * FROM itr_resv WHERE NR_VOO > ' + maior + ' ORDER BY NR_VOO ASC;';

        var resultados = [];

        con.query(sql, (err, result)=>{
        if (err) throw err;
        
        
        for (x in result){
            resultados.push(result[x]);
        }
            //res.render('lista/passageiros', {passageiros: resultados});
           
            res.send(resultados);

        });

    })

}