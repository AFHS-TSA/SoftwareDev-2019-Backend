var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "data",
  password: "tsadevpass01"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
