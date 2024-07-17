const express = require('express');
const app = express();
const ExpressError = require("./ExpressError");

// middleware
app.use((req, res ,next) => {
    console.log("middleware! 1");
    next();
})
app.use((req, res ,next) => {
    console.log("middleware! 2");
    next();
})
app.use((req, res ,next) => {
    console.log("middleware! 3");
    next();
})

// api key chech middleware

const checkToken = (req, res, next) => {
    let { token } = req.query;
    if (token === "giveaccess") {
        next();
    }
    throw new ExpressError(401,"ACCESS_DENIED");
};

app.get('/api',checkToken, (req, res) => {
    res.send("data")
})

app.get('/err' , (req, res) => {
    abbc = abc;
})

// utility middleware

app.use((req, res ,next) => {
    console.log('Time:', new Date(Date.now()));
    console.log('Time:', (Date.now()));
    console.log(req.method , req.hostname , req.path );
    next();
});

// Error middleware

app.use((err, req, res, next) => {
    let { status=500 , message="something WentWrong" } = err;
    console.log(err);
    console.error(err.stack);
    res.status(status).send(message);
});

app.get('/', (req, res) => {
    res.send('Root page');
});

app.get('/admin' , (req, res) => {
    throw new ExpressError(403 , "ACCESS IS FORBIDDEN");
})

// app.use((err,req, res , next) => {
//     let { status , messsage } = err;
//     // res.status(status).send(messsage);
//     res.status(404).send('Page not found');
//  });


app.listen(3000 , () =>{
    console.log('Server is running on port 3000');
});