const mongoose=require('mongoose');

//Defining the Schema
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    }
});

//Creating person model
const Person=mongoose.model('Person',personSchema);

//Exporting the model
module.exports=Person;
