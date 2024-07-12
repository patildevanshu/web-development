const mongoose = require("mongoose");

const chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "rohit",
    to: "virat",
    msg: "review lelu kya",
    created_at: new Date(),
  },
  {
    from: "virat",
    to: "rohit",
    msg: "lele kya pata outside edge laga ho",
    created_at: new Date(),
  },
  {
    from: "rohit",
    to: "virat",
    msg: "leleta hu tin tin h",
    created_at: new Date(),
  },
  {
    from: "pat cummins",
    to: "bcci",
    msg: "meko bhi team india me aana h",
    created_at: new Date(),
  },
  {
    from: "travis head",
    to: "Rohit",
    msg: "mujzhe maaph kardo hitman :(",
    created_at: new Date(),
  },
  {
    from: "goutam Gambhir",
    to: "MS dhoni",
    msg: "Ek EK chakke ne match nahi jitaya :)",
    created_at: new Date(),
  },
  {
    from: "rohit",
    to: "virat",
    msg: "tu vahape vo shot vesi ball pe kese khella",
    created_at: new Date(),
  },
];

chat.insertMany(allChats);
