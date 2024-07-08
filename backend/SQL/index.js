const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended : true }));
const port = 8080;

app.set('view engine', 'ejs');
app.set("views" , path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'user_info',
    password : 'devanshu'
  });

  let getRandomUser = () =>  {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
       faker.internet.password()
    ];
  };


// generating and inserting data of 1000 users using faker
// let data =[];
// for(let i = 1; i < 1000; i++) {
//     data.push(getRandomUser());
// }

// inserting new data
// let q = `INSERT INTO user (id, username, email, password) VALUES ?`;
// try {
//     connection.query( q , [data] , (err, result) => {
//         if(err) throw err;
//         console.log(result);
//     });
// } catch(err) {
//     console.log(err);
// }

// connection.end();

app.listen(port , () =>{
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  let q = `SELECT count(*) FROM user;`
  try {
    connection.query(q, (err, result) => {
      if(err) throw err;
      let count = result[0]['count(*)'];
      res.render("home.ejs" , { count });
    });
  }  catch (err) {
      res.send('some erorr in database');
  }
});

// all users
app.get('/users', (req, res) => {
  let q = `SELECT * FROM user;`
  try {
    connection.query(q, (err, users) => {
      if(err) throw err;
      res.render("showuser.ejs" , { users });
    });
  }  catch (err) {
      res.send('some erorr in database');
  }
});

// edit route

app.get('/users/:id/edit', (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id =?`
    try {
      connection.query(q, [id], (err, result) => {
        if(err) throw err;
        console.log(result[0]);
        let user = result[0];
        res.render("edit.ejs", { user });
      });
    }  catch (err) {
        res.send('some erorr in database');
    }
});


// update route

app.patch("/users/:id" , (req , res) => {
  let { id } = req.params;
  let { username, password } = req.body;

  let q = `SELECT * FROM user WHERE id =?`
    try {
      connection.query(q, [id], (err, result) => {
        if(err) throw err;
        console.log(result[0]);
        let user = result[0];
      });
    }  catch (err) {
        res.send('some erorr in database');
    }

  let update = `UPDATE user SET username =? WHERE id =? AND password =?`
  try {
    connection.query(update, [username, id, password], (err, result) => {
      if(err) throw err;
      console.log(result);
      res.redirect("/users");
    });
  }  catch (err) {
      res.send('some erorr in database');
  }
});


