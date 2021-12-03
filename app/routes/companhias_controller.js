const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });

module.exports=function(app){

    app.get('/companhias', function (req, res){

        var paises = [];
        let sql = 'SELECT * FROM itr_pais;'
        let sql2 = 'SELECT * FROM itr_cmpn_aerea;';
        let companhias = [];

        con.query(sql, (err,result)=>{

            if (err) throw err;

            for (x in result){
            
                paises.push({nome: result[x].NM_PAIS});
            }
            
            
        con.query(sql2, (err, result)=>{
            if (err) throw err;

            for (x in result){
                companhias.push(result[x]);
            }
        
            res.render('lista/companhias',{paises:paises, companhias:companhias});
        })
            
        });

        

        
    
    });
    
    app.get('/companhias/cadastro', function (req, res){
    
        res.render('cadastro/cadastro_companhia');
    
    });
    
    app.get('/companhias/editar', function (req, res){
    
        res.render('editar/editar_companhia');
    
    });

    app.get('/companhias/busca', function (req, res){

        let busca = req.query.busca;

        //console.log(req.query)
        
        sql = `SELECT * FROM itr_cmpn_aerea WHERE NM_CMPN_AEREA LIKE '%` + busca + `%' ;` ;

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
};