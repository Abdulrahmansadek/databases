const mysql = require("mysql");
const { UTF16_BIN } = require("mysql/lib/protocol/constants/charsets");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "homework",
});

connection.connect();
// create database
const dbQueries = [
  `DROP DATABASE  homework`,
  `CREATE DATABASE homework`,
  `USE homework`,
  `SET FOREIGN_KEY_CHECKS=0`,
];
dbQueries.forEach((db) =>
  connection.query(db, (error, result) => {
    if (error) throw error;

    console.log(`database created`);
  })
);

// create authors tables

const authorsTable = [
  `CREATE TABLE authors (
    author_no INT PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR (20),
    university VARCHAR(50),
    date_of_birth DATE,
    h_index INT ,
    gender ENUM ('f','m'))`,
];

authorsTable.forEach((table) =>
  connection.query(table, (error, result) => {
    if (error) throw error;
    console.log(`table authors created`);
  })
);
// add mentor column
const addMentors = `ALTER TABLE authors ADD mentor INT`;

connection.query(addMentors, (error, resolve) => {
  if (error) throw error;
  console.log(`column mentor added`);
});

// create papers table

const papersTable = [
  `CREATE TABLE research_Papers (
        paper_id INT PRIMARY KEY AUTO_INCREMENT,
        paper_title VARCHAR (100),
        conference VARCHAR(100),
        publish_date YEAR)
     `,
];
papersTable.forEach((table) =>
  connection.query(table, (error, result) => {
    if (error) throw error;
    console.log(`papers table is added`);
  })
);

const createAuthorsResearchPapersTable = [
  `CREATE TABLE author_research (
    author_no INT NOT NULL,
    paper_id INT NOT NULL,
   FOREIGN KEY(author_no) REFERENCES authors(author_no),
   FOREIGN KEY(paper_id) REFERENCES research_Papers(paper_id),
   PRIMARY KEY (author_no,paper_id))
`,
];
createAuthorsResearchPapersTable.forEach((table) =>
  connection.query(table, (error, result) => {
    if (error) throw error;
    console.log(`authors research papers table is added`);
  })
);

// inserting data into authors

const authorsData = `INSERT INTO authors (author_name,
  university,
  date_of_birth,
  h_index,
  gender,
  mentor) VALUES ('Smol JP','Canada university','1976-01-14',14,'M',5),
  ('Xie P A','china university','1969-01-12',6,'F',4),
  ('Effler  SW','usa University','1970-02-15',10,'M',3),
  ('Rodriguez-Iturbe I','University of Sevilla','1972-04-12',14,'M',2),
  ('Rinaldo A','Italy university','1963-07-12',14,'M',2),
  ('Hecky RE','Canada university','1977-09-02',14,'M',4),
  ('Ebener','usa university','1976-12-01',7,'F',7),
  ('Lotter AF','Switzerland university','1980-11-09',15,'M',12),
  ('Wuest A','Switzerland university','1959-10-14',12,'M',10),
  ('Jones ML','usa university','1970-01-11',18,'M',1),
  ('Imberger J','Australia university','1970-02-28',11,'M',1),
  ('Sivapalan','Austria university','1964-08-23',11,'F',2),
  ('Middleburh JJ A','Netherlands university','1969-07-24',16,'M',2),
  ('Cirpka','Germany university','1976-12-31',10,'M',2),
  ('Jeppesen','Denmark university','1982-02-14',5,'F',1)

`;

// insert data into research_papers

const research_data = `INSERT INTO research_papers(paper_title,conference,publish_date)
VALUES 
('weight control','How effective are different exercise regimes for losing weight and maintaining weight loss','2010'),
('stress','How does stress affect the body?','2010'),
('suicide','Should physician-assisted suicide be legal?','2010'),
('civil war','What were the causes of the Civil War?','2010'),
('roman empire','What events led to the fall of the Roman Empire?','2010'),
('black holes','How are black holes created?','2010'),
('nuclear energy','Should the US rely on nuclear energy more?','2010'),
('intelligence','How is Google search affecting our intelligence?','2010'),
('phones and productivity','Do smartphones increase or decrease workplace productivity?','2010'),
('social media','Has social media made people more or less connected?','2010'),
('auto pilot','Analyze the history and progress of self-driving vehicles.','2010'),
('NASA',"What have NASA's biggest successes and failures been?",'2010'),
('japan','How has Japan changed and evolved over the centuries?','2010'),
('cleopatra',"What led to Cleopatra's fall as ruler of Egypt?",'2010'),
('british rule in india','What were the impacts of British rule in India?','2010'),
('hiroshima and nagasaki','Was the atomic bombing of Hiroshima and Nagasaki necessary?','2010'),
('memories','Which methods are most effective for improving memory?','2010'),
('prisons','Which prison reforms have proven most effective?','2010'),
('us security airport','Has the increase in US airport security made passengers safer?','2010'),
('divorce rate','How and why have divorce rates changed over time?','2010'),
('education','Do students learn better in same-sex classrooms?','2010'),
('Brexis','What factors contributed to the UK deciding to leave the EU (Brexit)?','2010'),
('rap music','How has rap music evolved in the past decade?','2010'),
('famous artist','Analyze the impact a famous artist had on the world.','2010')
`;

// insert authors research data
const authorsResearchData = `INSERT INTO author_research (author_no,paper_id)
VALUES 
(1,2),(1,3),(2,1),(3,4),(4,5),
(10,6),(12,7),(15,8),
(1,9),(2,10),(4,11),
(10,12),(12,13),(5,14),
(9,15),(9,16),(2,17),(1,18),
(9,19),(9,20),(1,20),(2,22),(9,22)`;

// update mentor
const updateMentor = `ALTER TABLE authors ADD CONSTRAINT FOREIGN KEY(mentor) REFERENCES authors(author_no)`;
connection.query(updateMentor, (error, result) => {
  if (error) throw error;
  console.log("mentor column updated");
});

//data function
const insertData = function (data) {
  connection.query(data, (error, results) => {
    if (error) throw error;
    console.log("data");
  });
};

insertData(authorsData);
insertData(research_data);
insertData(authorsResearchData);

//1. Write a query that prints names of all `authors` and their corresponding `mentors`.
//2. Write a query that prints all columns of `authors` and their published `paper_title`.
//If there is an author without any `research_Papers`, print the information of that `author` too.

const solutionQueries = [
  `SELECT a.author_name,m.author_name As mentor 
  FROM authors a 
  JOIN authors m
  ON a.mentor=m.author_no`,
  `SELECT a.* ,r.paper_title
  FROM authors a
  LEFT JOIN author_research re
  ON a.author_no=re.author_no
  LEFT JOIN research_papers r
  ON r.paper_id=re.author_no`,
];

solutionQueries.forEach((solution) => {
  connection.query(solution, (error, results) => {
    if (error) throw error;
    console.log(results);
  });
});

//1. All research papers and the number of authors that wrote that paper.
//2. Sum of the research papers published by all female authors.
//3. Average of the h-index of all authors per university.
//4. Sum of the research papers of the authors per university.
//5. Minimum and maximum of the h-index of all authors per university.

const solutions_excercise2 = [
  //All research papers and the number of authors that wrote that paper.
  `SELECT paper_title,COUNT(1) As total FROM research_papers
  LEFT JOIN author_research
  ON research_papers.paper_id=author_research.paper_id
  GROUP BY paper_title`,

  //Sum of the research papers published by all female authors.
  `SELECT count(1) AS 'published by female' FROM research_papers
 JOIN author_research
   ON research_papers.paper_id=author_research.paper_id
  JOIN authors 
  ON authors.author_no=author_research.author_no
     WHERE gender ='F'`,

  //Average of the h-index of all authors per university.
  `SELECT university,AVG(h_index) AS 'average h-index' FROM authors GROUP BY university `,
  //Sum of the research papers of the authors per university.
  `SELECT university,count(paper_id) AS total
  FROM authors 
   JOIN  author_research
   ON authors.author_no=author_research.author_no 
   GROUP by university ORDER BY total DESC`,
  //Minimum and maximum of the h-index of all authors per university.
  `SELECT university,MIN(h_index),MAX(h_index) FROM authors 
  GROUP BY university`,
];

solutions_excercise2.forEach((solution) =>
  connection.query(solution, (error, results) => {
    if (error) throw error;
    console.log(results);
  })
);

connection.end();
