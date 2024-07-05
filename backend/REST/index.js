const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.set("views" , path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let port = 3000;



let posts = [
    {
        id : uuidv4(),
        username : 'devnashu patil',
        content : 'This is my first blog post',
    },
    {
        id : uuidv4(),
        username : 'yash patil',
        content : 'great things take time!'
    },
    {
        id : uuidv4() ,
        username : 'aadi patil',
        content : 'do something'
    },
    {
        id : uuidv4() ,
        username : 'legend patil',
        content : 'Time to live',
    }
]

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/posts', (req, res) => {
  res.render("index.ejs" , { posts })
});

app.get('/posts/new', (req, res) => {
  res.render("new.ejs");
});

app.post('/posts', (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id , username, content });
    // res.render("index.ejs", { posts });
    res.redirect('/posts');
});

app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs" , { post })
  });

app.patch('/posts/:id' , (req , res) => {
    let { id } = req.params;
    let newContent = req.body.content ;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(newContent);
    res.send("working")
})