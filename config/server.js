const express = require('express');
const bodyParser = require('body-parser');
const {check, Result}= require('express-validator');
const mysql = require('mysql');


var app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//Estabelece conexão com o banco de dados

//const con = require('../config/dbConnection.js');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sda"
  });


app.set('view engine', 'ejs');
app.set('views', './app/views');

//var home = require('./app/routes/home');


app.get('/', function (req, res){

    res.render('home');

});

//Passageiros
app.get('/passageiros', function (req, res){
    
    
    let sql = 'SELECT * FROM itr_psgr;';
    
    let resultados = [];
    con.query(sql, (err, result)=>{
        if (err) throw err;

        for (x in result){
            resultados.push(result[x]);
        }
        
        res.render('lista/passageiros', {passageiros: resultados});
    })
    

});

app.get('/passageiros/cadastro', function (req, res){
    
    var paises = [];
    let sql = 'SELECT * FROM itr_pais;'
    con.query(sql, (err,result)=>{

        if (err) throw err;

        for (x in result){
        
            paises.push({codigo: result[x].cd_pais, nome: result[x].nm_pais});
        }

        
        res.render('cadastro/cadastro_passageiro', {paises: paises});
    });

    

});

//Cadastrar passageiros
app.post('/passageiros/cadastrar', function(req,res){

    const cad = req.body;
    

    let sql = `INSERT INTO itr_psgr (NM_PSGR, IC_SEXO_PSGR, DT_NASC_PSGR, CD_PAIS,IC_ESTD_CIVIL,CD_PSGR_RESP) VALUES (` + mysql.escape(cad.nome) + `,` + mysql.escape(cad.sexo) + `,` + mysql.escape(cad.data_nasc) + `,` + mysql.escape(cad.pais) + `,` + mysql.escape(cad.estado_civil) + `,` + `5` + `);`

    con.query(sql, (err,result)=>{
        if (err) throw err;

        console.log('Passageiro cadastrado com sucesso!');

        res.redirect('/');
    });
    
});


app.get('/passageiros/editar/:id', function (req, res){

    console.log(req.params.id);

    res.render('editar/editar_passageiro');

});

app.get('/passageiros/busca', function (req, res){

    let busca = req.query.busca;
    
    console.log(busca)

});

//Aeronaves
app.get('/aeronaves', function (req, res){

    res.render('lista/aeronaves');

});

app.get('/aeronaves/cadastro', function (req, res){

    res.render('cadastro/cadastro_aeronave');

});

app.get('/aeronaves/editar', function (req, res){

    res.render('editar/editar_aeronave');

});

//Aeroportos
app.get('/aeroportos', function (req, res){

    res.render('lista/aeroportos');

});

app.get('/aeroportos/cadastro', function (req, res){

    res.render('cadastro/cadastro_aeroporto');

});

app.get('/aeroportos/editar', function (req, res){

    res.render('editar/editar_aeroporto');

});

//Companhias

app.get('/companhias', function (req, res){

    res.render('lista/companhias');

});

app.get('/companhias/cadastro', function (req, res){

    res.render('cadastro/cadastro_companhia');

});

app.get('/companhias/editar', function (req, res){

    res.render('editar/editar_companhia');

});


//Equipamentos
app.get('/equipamentos', function (req, res){

    res.render('lista/equipamentos');

});

app.get('/equipamentos/cadastro', function (req, res){

    res.render('cadastro/cadastro_equipamento');

});

app.get('/equipamentos/editar', function (req, res){

    res.render('editar/editar_equipamento');

});

//Países
app.get('/paises', function (req, res){

    res.render('lista/paises');

});

app.get('/paises/cadastro', function (req, res){

    res.render('cadastro/cadastro_pais');

});

app.get('/paises/editar', function (req, res){

    res.render('editar/editar_pais');

});

//Reservas 
app.get('/reservas', function (req, res){

    res.render('lista/reservas');

});

app.get('/reservas/cadastro', function (req, res){

    res.render('cadastro/cadastro_reserva');

});

app.get('/reservas/editar', function (req, res){

    res.render('editar/editar_reserva');

});

//Rotas de voo

app.get('/rotas', function (req, res){

    res.render('lista/rotas-voo');

});

app.get('/rotas/cadastro', function (req, res){

    res.render('cadastro/cadastro_rota_voo');

});

app.get('/rotas/editar', function (req, res){

    res.render('editar/editar_rota_voo');

});


//Unidades federais
app.get('/uf', function (req, res){

    res.render('lista/uf');

});

app.get('/uf/cadastro', function (req, res){

    res.render('cadastro/cadastro_uf');

});

app.get('/uf/editar', function (req, res){

    res.render('editar/editar_uf');

});


// Voos
app.get('/voos', function (req, res){

    res.render('lista/voos');

});

app.get('/voos/cadastro', function (req, res){

    res.render('cadastro/cadastro_voo');

});

app.get('/voos/editar', function (req, res){

    res.render('editar/editar_voo');

});





module.exports = app;