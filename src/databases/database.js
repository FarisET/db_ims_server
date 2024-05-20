var mysql= require('mysql2');
var fs = require('fs');
require('dotenv').config();

// var con =mysql.createConnection({
//     host:'safifytestmysql.mysql.database.azure.com',
//     user:'sameed',
//     password:'Root#123',
//     database:'test1',
//     ssl  : {
//         ca : process.env.MYSQL_SSL_CERT // Path to your SSL certificate
//     }
// })


// con.connect(function(error){
//     if(error){
//         console.log(error);
//         return;
//     }else{
//         console.log('Connected');
//     }
// });


//local database
// var con =mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'-VGy$2jx',
//     database:'test1',
// })

//AVN database
var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./ca.pem").toString(),
        //ca: process.env.MYSQL_AVN_SSL_CERT
        //ca:fs.readFileSync('C:/Users/hp/Downloads/ca (1).pem')
    }
});

con.connect(function(error){
    if(error){
        console.log(error);
        return;
    }else{
        console.log('Connected');
    }
});

module.exports=con;