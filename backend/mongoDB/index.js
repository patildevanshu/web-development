const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

const User = mongoose.model("User", userSchema);

//   User.find({age :{$gt : 25}}).then( (res) => { console.log(res)}).catch((err) => console.log(err));
// User.findById("668df45daadd52c8c4f43336").then( (res) => { console.log(res)}).catch((err) => console.log(err));

//   const user1 = new User({
//     name : "John Doe",
//     age : 30,
//     email : "johndoe@example.com",
//   })

//   const user2 = new User({
//     name : "Jane Smith",
//     age : 25,
//     email : "janesmith@example.com",
//   })

//   user1.save().then( (res) => { console.log(res)}).catch((err) => console.log(err));
//   user2.save().then( (res) => { console.log(res)}).catch((err) => console.log(err));

// User.insertMany([
//     { name : "Ironman", age :25 , email : "ironman@gmail.com"},
//     { name : "hulk", age :35 , email : "ironman@gmail.com"},
//     { name : "loki", age :595 , email : "loki@gmail.com"}
// ]).then( (res) => { console.log(res)}).catch((err) => console.log(err));

// User.findByIdAndUpdate("668df45daadd52c8c4f43336", {age : 756}).then( (res) => { console.log(res)}).catch((err) => console.log(err));


