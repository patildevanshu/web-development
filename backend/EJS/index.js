const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, '/views'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/rolladice' , (req , res) => {
  let rolldice = Math.floor(Math.random()*6)+1;
  res.render("rolldice" , {num : rolldice});
});

app.get('/', (req, res) => {
  res.render("home.ejs");
});


// app.get('/ig/:username' , (req , res) =>{
//   let followers = ["devanshu" , "patil" , "unkonown" , "abc"];
//   let { username } = req.params;
//   res.render("instagram.ejs" , { username , followers })
// })

app.get('/ig/:username' , (req , res) =>{
  let { username } = req.params;
  let instadata = require("./data.json")
  let data = instadata[username];
  if (data) {
    res.render("instajsondata.ejs" , { data });
  }else{
    res.send("User not found!");
  }
  
})