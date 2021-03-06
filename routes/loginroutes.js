var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'data',
  password : 'tsadevpass01',
  database : 'backend'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting to database ... nn");
}
});
exports.register = function(req,res){
  // console.log("req",req.body);
  var today = new Date();
  var users={
    "first_name":req.body.first_name,
    "last_name":req.body.last_name,
    "email":req.body.email,
    "password":req.body.password,
    "created":today,
    "modified":today
  }
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
  });
}
exports.login = function(req,res){
  var email= req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if(results[0].password == password){
        console.log('Successful Login From Remote Client');
		res.send({
          "code":200,
          "success":"login sucessfull"
            });
      }
      else{
		console.log('Unsuccessful Login From Remote Client');
        res.send({
          "code":204,
          "success":"Email and password do not match"
            });
      }
    }
    else{
		console.log('Remote Client Attempted Login with Unknown Email');
		res.send({
        "code":204,
        "success":"Email does not exist"
          });
    }
  }
  });
}
