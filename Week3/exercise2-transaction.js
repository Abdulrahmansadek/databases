const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});
connection.connect();
const queries = [
  `SET autocommit=0 `,
  `START TRANSACTION`,
  `UPDATE account SET balance = 250 WHERE account_number=101 `,
  `UPDATE account SET balance =1650 WHERE account_number=102 `,
  `INSERT INTO account_changes (account_number,amount,changed_date,remark)
  VALUES 
  (101,1000,'2022-01-30','send'),
  (102,1000,'2022-01-30','receive') 
  `,
  `COMMIT`,
];
queries.forEach((exchange) => {
  connection.query(exchange, (error, result) => {
    if (error) throw error;
    console.log(result);
  });
});

connection.end();
