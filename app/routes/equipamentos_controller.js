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


    app.get('/equipamentos/editar', function (req, res){

        res.render('editar/editar_equipamento');

    });

    app.get('/equipamentos/busca', function (req, res){

        let busca = req.query.busca;

        //console.log(req.query)
        
        sql = `SELECT * FROM itr_eqpt WHERE CD_EQPT LIKE '%` + busca + `%' ;` ;

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