//var mysql= require('mysql');
var mysql= require('mysql2');
var fs = require('fs');

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
    host: 'mysql-18e3438a-smdkhatri1-8514.b.aivencloud.com',
    //port: 16298,
    user: 'avnadmin',
    password: 'AVNS_8t46WmbqkiS0u79D1GI',
    port: 16294,
    database: 'test1',
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