const express = require('express');
const app = express();
const port = 3000;


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// app.use((req, res) =>{
//     console.log("request received");
//     res.send({
//         fruit : 'apple',
//         color : 'red'
//     });
// })


app.get('/hw', (req, res) => {
  res.send('Hello-World!')
})
// app.get('/apple', (req, res) => {
//   res.send('Hello World! apple')
// })
// app.get('/mango', (req, res) => {
//   res.send('Hello World! mango')
// })
// app.get('/fruit', (req, res) => {
//   res.send('Hello World! fruit')
// })
// app.get("*", (req, res) => {
//   res.send('any path')
// })

// app.post('/' , (req , res) => {
//     res.send("you send a post request")
// })

app.get('/:variables/:variable2', (req, res) => {
    console.log(req.params); // To see the parameters in the console log 
    res.send(`Hello World! ${req.params.variables}`)
})

app.get('/search', (req, res) => {
    console.log(req.query); // To see the query parameters in the console log
    let { q } = req.query;
    res.send(`Hello World! ${q}`);
})