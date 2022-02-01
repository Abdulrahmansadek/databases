const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});
connection.connect();

const queries = [
  `USE userdb`,
  `CREATE TABLE IF NOT EXISTS account (account_number INT PRIMARY KEY 
    ,balance FLOAT)`,
  `CREATE TABLE  IF NOT EXISTS account_changes (change_number INT PRIMARY KEY AUTO_INCREMENT
    ,account_number INT
    ,amount FLOAT
    ,changed_date DATETIME
    ,remark VARCHAR(100),
  FOREIGN KEY(account_number) REFERENCES account(account_number))`,
  `SHOW tables`,
  `SELECT * FROM account`,
  `SELECT * FROM account_changes`,
];

queries.forEach((account) => {
  connection.query(account, (error, results) => {
    if (error) throw error;
    console.log(results);
  });
});
connection.end();
