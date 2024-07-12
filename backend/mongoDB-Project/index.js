const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const chat = require('./models/chat.js');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.set ("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
  }
  
// let chat1 = new chat({
//   from : "devanshu",
//   to : "tony Stark",
//   msg : "welcome to the chat",
//   created_at : new Date(),
// });

// chat1.save().then( (res) => { console.log(res)}).catch((err) => console.log(err));









// Index routes
app.get('/chats', async (req, res) => {
  let chats = await chat.find();
  res.render('index.ejs', { chats });
});


// new routes
app.get('/chats/new', (req, res) => {
  res.render('new.ejs');
});

// create routes
app.post('/chats', async (req, res) => {
  let {from , to , msg} = (req.body);
  let newChat = new chat({
    from : from ,
    to : to,
    msg : msg,
    created_at : new Date(),
  });
  await newChat.save();
  res.redirect('/chats');
  // console.log(newChat);
  // res.send("saved")
});


// edit routes

app.get('/chats/:id/edit', async (req, res) => {
  let { id } = req.params;
  let oldChat = await chat.findById(id);
  res.render('edit.ejs', { oldChat });
  // console.log(oldChat);
  // res.send("edit");
});

// update routes
app.put('/chats/:id/', async (req, res) => {
  let { id } = req.params;
  let { msg : newMsg } = req.body;
  let updatedChat = await chat.findByIdAndUpdate(id, {
    msg : newMsg,
    created_at : new Date(),
  }, { new: true , runValidators : true });
  res.redirect('/chats');
  console.log(updatedChat);
  // res.send("updated");
});

// delete routes

app.delete('/chats/:id', async (req, res) => {
  let { id } = req.params;
  await chat.findByIdAndDelete(id);
  res.redirect('/chats');
  // console.log(id);
  // res.send("deleted");
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});