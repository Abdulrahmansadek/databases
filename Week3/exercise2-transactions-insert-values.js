const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});
connection.connect();

const queries = [
  `INSERT INTO account (account_number,balance)
     VALUES
    (101,1250)
    ,(102,600)
    ,(103,1200)
    ,(104,300)
    ,(105,750)`,
  `INSERT INTO account_changes(account_number,amount,changed_date,remark)
    VALUES
    (102,125.50,'2022-01-28','added')
    ,(103,200,'2022-01-09','added')
    ,(101,50,'2022-01-01','added')
    ,(104,300,'2022-01-14','added')
    `,
  `SELECT * FROM account`,
  `SELECT * FROM account_changes`,
];

queries.forEach((transaction) => {
  connection.query(transaction, (error, results) => {
    if (error) throw error;
    console.log(results);
  });
});

connection.end();
