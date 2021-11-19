var mysql = require('mysql');

var con = function(){
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "sda"
    });
}

module.exports = function(){
 con;
};