var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect();
// DROP DATABASE
connection.query(`DROP DATABASE meetup`, (error, result) => {
  if (error) throw error;
  console.log("database deleted");
});

// create meetup database
connection.query(`CREATE DATABASE meetup`, (error, result) => {
  if (error) throw error;
  console.log("database created");
});
// select meetup database
connection.query(`use meetup`, (error, result) => {
  if (error) throw error;
  console.log("database is selected");
});

// create Invitee table
connection.query(
  `CREATE TABLE Invitee (invitee_no int AUTO_INCREMENT PRIMARY KEY,invitee_name VARCHAR(100) NOT NULL,invited_by VARCHAR(100))`,
  (error, result) => {
    if (error) throw error;
    console.log(result);
    console.log("invite table is created");
  }
);

// create room table
connection.query(
  `CREATE TABLE room (room_no int AUTO_INCREMENT PRIMARY KEY,room_name VARCHAR(100) NOT NULL,floor_number int)`,
  (error, result) => {
    if (error) throw error;
    console.log(result);
    console.log("room table is created");
  }
);
//create meeting table

connection.query(
  `CREATE TABLE Meeting (meeting_no int AUTO_INCREMENT PRIMARY KEY,meeting_title VARCHAR(100) NOT NULL,starting_time time,ending_time time, room_no int ,FOREIGN KEY(room_no) REFERENCES room(room_no))`,
  (error, result) => {
    if (error) throw error;
    console.log(result);
    console.log("room Meeting is created");
  }
);

// insert data into invitee
connection.query(
  `INSERT INTO invitee (invitee_name,invited_by) VALUES 
  ('Diego Maradona','team manager'),
  ('Pele','partnership manager'),
  ('Lionel Messi ','talents hunter'),
  ('Cristiano Ronaldo','manager'),
  ('Johan Cruijff','club president')`,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);

//insert data into room

connection.query(
  `INSERT INTO room (room_name,floor_number) VALUES 
  ('meeting room',3),
  ('the roof',5),
  ('cafeteria',1),
  ('waiting room ',2),
  ('entertainment room',4)`,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);

//insert data into room

connection.query(
  `INSERT INTO Meeting (meeting_title,starting_time,ending_time,room_no) VALUES 
  ('Discuss project','10:00:00','12:00:00',3),
  ('Meet Client','12:00:00','14:00:00',3),
  ('Play Playstation','15:30:00','16:00:00',4),
  ('Eat Lunch','14:00:00','15:00:00',1),
  ('Smoke Cigarette','15:00:00','15:30:00',5)`,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);

connection.end();
