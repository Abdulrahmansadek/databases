const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

connection.connect();

function getPopulation(country, Name, Code, cb) {
  const query = "SELECT Population FROM  ?  WHERE Name= ?  and code= ?";
  connection.query(query, [country, Name, Code], (error, result) => {
    if (error) cb(error);
    if (result.length == 0) cb(new Error("Not found"));
    cb(null, result[0].name);
  });
}

getPopulation(`country`, `Netherlands`, `NLD`, console.log);
connection.end();
