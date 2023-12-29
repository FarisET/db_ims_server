var mysql= require('mysql');
var fs = require('fs');

var con =mysql.createConnection({
    host:'safifytestmysql.mysql.database.azure.com',
    user:'sameed',
    password:'Root#123',
    database:'test1',
    ssl  : {
        ca : process.env.MYSQL_SSL_CERT // Path to your SSL certificate
    }
})


con.connect(function(error){
    if(error){
        console.log(error);
        return;
    }else{
        console.log('Connected');
    }
});

module.exports=con;