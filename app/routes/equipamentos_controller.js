const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){
    //Equipamentos
    app.get('/equipamentos', function (req, res){

        let sql = 'SELECT * FROM itr_eqpt;';
        
        let resultados = [];
        con.query(sql, (err, result)=>{
            if (err) throw err;

            for (x in result){
                resultados.push(result[x]);
            }
            
            res.render('lista/equipamentos', {equipamentos: resultados});
        })
        
        

    });

    app.get('/equipamentos/cadastro', function (req, res){

        res.render('cadastro/cadastro_equipamento');

    });

    app.post('/equipamentos/cadastrar', function(req,res){
        
        const cad = req.body;


        let qt_psgr = cad.quant_passageiro == '' ? null : cad.quant_passageiro;
        


        let sql = 'INSERT INTO itr_eqpt ( CD_EQPT, NM_EQPT, DC_TIPO_EQPT, QT_MOTOR, IC_TIPO_PRPS, QT_PSGR) VALUES (' + mysql.escape(cad.cod_equip) + ', ' + mysql.escape(cad.nome) + ', ' + mysql.escape(cad.tipo_equip) + ', ' + mysql.escape(cad.quant_motor) + ', ' + mysql.escape(cad.tipo_propulsor) + ', ' + mysql.escape(qt_psgr) + ');';

        con.query(sql, (err, result)=>{
            if (err) throw err;

            console.log('Equipamento cadastrado com sucesso!');
        
            res.redirect('/equipamentos');
        });
    });


    app.get('/equipamentos/editar/:id', function (req, res){


        let id = req.params.id;
        

        let sql = 'SELECT * FROM itr_eqpt WHERE CD_EQPT = ' + mysql.escape(id) + ';';
        con.query(sql, (err, result)=>{
            if (err) throw err;
            
            res.render('editar/editar_equipamento', {equipamento: result});
        })
        

    });

    app.post('/equipamentos/editar/atualizar/:id', function(req, res){
        
        const id = req.params.id;

        const data = req.body;
        
        let sql = 'UPDATE itr_eqpt SET NM_EQPT = ' + mysql.escape(data.nome) + ', DC_TIPO_EQPT = ' + mysql.escape(data.tipo_equip) + ', QT_MOTOR = ' + mysql.escape(data.quant_motor) + ',  IC_TIPO_PRPS = ' + mysql.escape(data.tipo_propulsor) + ', QT_PSGR = ' + mysql.escape(data.quant_passageiro) + 'WHERE CD_EQPT = ' + mysql.escape(id) + ';';

        con.query(sql, (err, result)=>{
            if (err) throw err;
            
            console.log('Linhas afetadas: ' + result.affectedRows);
        
        });
        
        res.redirect('/equipamentos');
    });

    app.post('/equipamentos/editar/deletar/:id', function(req, res){
      
        const id = req.params.id;

        let sql = 'DELETE FROM itr_eqpt WHERE CD_EQPT =' + mysql.escape(id) + ';' ;

        con.query(sql, (err, result)=>{
            if (err) throw err;
                
            //console.log('Linhas afetadas: ' + result.affectedRows);
            res.send('Equipamento deletado com sucesso');
            
        });

    });

    app.get('/equipamentos/busca', function (req, res){

        let busca = req.query.busca;

        const tipo = req.query.tipo == null ? '' : req.query.tipo;
        const nome = req.query.nome == null ? '' : req.query.nome;
        const quant = req.query.quant == null ? '' : req.query.quant;
        //console.log(req.query)

        let sql;

        if(quant == ''){
            sql = `SELECT * FROM itr_eqpt WHERE NM_EQPT LIKE '%` + nome +  `%' AND  DC_TIPO_EQPT LIKE '%` + tipo + `%' AND CD_EQPT LIKE '%` + busca + `%';`;  
        } else {
            sql = `SELECT * FROM itr_eqpt WHERE NM_EQPT LIKE '%` + nome +  `%' AND  DC_TIPO_EQPT LIKE '%` + tipo + `%'  AND QT_PSGR =` + quant + ` AND CD_EQPT LIKE '%` + busca + `%';`;  
        }
        
        //sql = `SELECT * FROM itr_eqpt WHERE CD_EQPT LIKE '%` + busca + `%' ;` ;

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
    
    app.get('/equipamentos/filtro', function (req, res){

        const tipo = req.query.tipo == null ? '' : req.query.tipo;
        const nome = req.query.nome == null ? '' : req.query.nome;
        const quant = req.query.quant == null ? '' : req.query.quant;

        const busca = req.query.busca == null ? '' : req.query.busca;

        let sql;

        
        if(quant == ''){
            sql = `SELECT * FROM itr_eqpt WHERE NM_EQPT LIKE '%` + nome +  `%' AND  DC_TIPO_EQPT LIKE '%` + tipo + `%' AND CD_EQPT LIKE '%` + busca + `%';`;  
        } else {
            sql = `SELECT * FROM itr_eqpt WHERE NM_EQPT LIKE '%` + nome +  `%' AND  DC_TIPO_EQPT LIKE '%` + tipo + `%'  AND QT_PSGR =` + quant + ` AND CD_EQPT LIKE '%` + busca + `%';`;  
        }
        console.log(sql)
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