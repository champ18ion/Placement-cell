const express = require('express')


const app = express();
const port = process.env.PORT || 5000;


// set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");


// // using express routers
// app.use(require("./routes"));

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/sign-up',(req,res)=>{
    res.render('sign-up.ejs')
})

app.get('/log-in',(req,res)=>{
    res.render('log-in')
})

//  listening to the port 8000;
app.listen(port, (err) => {
  if (err) {
    console.log("error in starting the server", err);
    return;
  }
  console.log("server listening on port 5000");
});