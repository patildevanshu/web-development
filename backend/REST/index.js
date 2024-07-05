const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.set("views" , path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let port = 3000;

let posts = [
    {
        username : 'devnashu patil',
        content : 'This is my first blog post',
    },
    {
        username : 'yash patil',
        content : 'great things take time!',
    },
    {
        username : 'aadi patil',
        content : 'do something',
    },
    {
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
