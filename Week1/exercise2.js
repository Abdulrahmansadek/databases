var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

//USE WORLD DATABASE
connection.query(`use world`, (error, result) => {
  if (error) throw error;
  console.log("database is selected");
});

connection.query(`show tables`, (error, result) => {
  if (error) throw error;
  console.log(result);
  console.log("tables");
});

//1. What are the names of countries with population greater than 8 million?
connection.query(
  `SELECT name FROM  country WHERE population > 8000000  `,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);
//2. What are the names of countries that have “land” in their names?

connection.query(
  `SELECT name FROM  country WHERE name like '%land%' `,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);

//3. What are the names of the cities with population in between 500,000 and 1 million?
connection.query(
  `SELECT name  AS city_name FROM  city WHERE population BETWEEN 500000 AND 1000000 `,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);
//4. What's the name of all the countries on the continent ‘Europe’?

connection.query(
  `SELECT name  AS european_country  FROM  country WHERE continent ='Europe' `,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);

//5. List all the countries in the descending order of their surface areas.

connection.query(
  `SELECT name  AS country_name , SurfaceArea FROM  country   ORDER BY SurfaceArea DESC `,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);

//6. What are the names of all the cities in the Netherlands?

connection.query(
  `SELECT name  AS city_name FROM  city WHERE CountryCode='NLD' `,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);

//7. What is the population of Rotterdam?

connection.query(
  `SELECT population   AS Rotterdam_population  FROM  city WHERE name='Rotterdam' `,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);
//8. What's the top 10 countries by Surface Area?

connection.query(
  `SELECT name AS country_name , SurfaceArea  FROM  country  ORDER BY SurfaceArea DESC LIMIT 10 `,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);
//9. What's the top 10 most populated cities?
connection.query(
  `SELECT name AS city_name , population AS city_population   FROM  city  ORDER BY population DESC LIMIT 10 `,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);
//10. What is the population number of the world?

connection.query(
  `SELECT SUM(population) AS world_population FROM country`,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);
connection.end();
