

//EXPRESS:- server banane ke liye use karte hai
const express = require('express');
const app = express();
const db=require('./db');

const bodyParser=require('body-parser');
app.use(bodyParser.json());


//file me kuchh bhi change karo to server ko re-run karo

app.get('/', function (req, res) {
  res.send('Hello Welcom to our Hotel!!')
});



//importing the Router File
const personRoutes=require('./routes/personRoutes');
//using the router
app.use('/person',personRoutes);

const menuItemRoutes=require('./routes/menuItemRoutes');
//using the router
app.use('/menu',menuItemRoutes);

app.listen(3000, ()=>{
    console.log("Listening to port 3000");
});