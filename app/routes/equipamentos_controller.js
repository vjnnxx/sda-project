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

        var equipamentos = [];
        let sql = 'SELECT * FROM itr_eqpt;'
        con.query(sql, (err,result)=>{

            if (err) throw err;

            for (x in result){
            
                equipamentos.push({tipo: result[x].DC_TIPO_EQPT, nome: result[x].NM_EQPT,quantidade: result[x].QT_PSGR});
            }
            res.render('lista/equipamentos',{equipamentos:equipamentos});
        });

        
        

    });

    app.get('/equipamentos/cadastro', function (req, res){

        res.render('cadastro/cadastro_equipamento');

    });

    app.get('/equipamentos/editar', function (req, res){

        res.render('editar/editar_equipamento');

    });

}