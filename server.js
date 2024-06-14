

//EXPRESS:- server banane ke liye use karte hai
const express = require('express');
const app = express();
const db=require('./db');
require('dotenv').config();

const bodyParser=require('body-parser');
app.use(bodyParser.json());

const PORT=process.env.PORT || 3000;


//file me kuchh bhi change karo to server ko re-run karo

app.get('/', function (req, res) {
  res.send("Welcome to Our Restaurant! We're thrilled to have you dine with us. Our culinary team has prepared a delightful menu to tantalize your taste buds. Sit back, relax, and enjoy the flavors of our dishes crafted with care!")
});



//importing the Router File
const personRoutes=require('./routes/personRoutes');
//using the router
app.use('/person',personRoutes);

const menuItemRoutes=require('./routes/menuItemRoutes');
//using the router
app.use('/menu',menuItemRoutes);


app.listen(PORT, ()=>{
    console.log("Listening to port 3000");
});