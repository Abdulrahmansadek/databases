const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "restaurant",
});
connection.connect();

// create database
const queries = [
  `DROP DATABASE restaurant`,
  `CREATE DATABASE restaurant`,
  ` USE restaurant`,
];
queries.forEach((q) => {
  connection.query(q, (error, result) => {
    if (error) throw error;
    console.log("database is created");
  });
});

// create tables
const memberQueries = `CREATE TABLE members (
        member_id INT PRIMARY KEY AUTO_INCREMENT,
        member_name VARCHAR (25) NOT NULL,
        address VARCHAR(30)
)`;

//create dinner  table

const dinnerQuery = `CREATE TABLE dinners (
          dinner_id INT PRIMARY KEY AUTO_INCREMENT,
          dinner_date  date ,
         venue_code INT NOT NULL
        
  )`;

// create food table
const foodQueries = `CREATE TABLE foods (
            food_id INT PRIMARY KEY AUTO_INCREMENT,
           food_description VARCHAR(50)
    )`;

// create venue table
const venueQueries = `CREATE TABLE venue (
              venue_code INT PRIMARY KEY AUTO_INCREMENT,
             venue_description VARCHAR(50)
      )`;

// create orders table

const ordersQueries = `CREATE TABLE orders (
id INT PRIMARY KEY AUTO_INCREMENT
,member_id INT NOT NULL
,dinner_id INT NOT NULL
,food_id INT NOT NULL
,FOREIGN KEY (member_id) REFERENCES members(member_id)
,FOREIGN KEY (dinner_id) REFERENCES dinners(dinner_id)
,FOREIGN KEY (food_id) REFERENCES foods(food_id))`;

const createTales = (q) => {
  connection.query(q, (error, result) => {
    if (error) throw error;
  });
};

createTales(memberQueries);
createTales(dinnerQuery);
createTales(foodQueries);
createTales(venueQueries);
createTales(ordersQueries);
connection.end();
