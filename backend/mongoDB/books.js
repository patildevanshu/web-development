const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

const bookSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  author : {
    type : String,
     required : true
    },
  price : {
    type : Number,
  }
});

const Book = mongoose.model("Book", bookSchema);


const book1 = new Book({
    title : "To Kill a Mockingbird",
    author : "Harper Lee",
    price : 1299
});

//   book1.save().then( (res) => { console.log(res)}).catch((err) => console.log(err));