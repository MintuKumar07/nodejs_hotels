const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

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
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
});

//Hashing the password before saving
personSchema.pre('save',async function(next){
    const person=this;

    //Hash the password only if it has been mdified or is new

    if(!person.isModified('password')) return next();   //agar modify hua hai to try function run karo warna next ko call kar do

    try{
        //Hash password generation
        const salt=await bcrypt.genSalt(10);

        //Hash the password
        const hashedPassword=await bcrypt.hash(person.password,salt);
        
        //Replace the password with the hashed password
        person.password=hashedPassword;
        next();
    }
    catch(err){
        return next(error);

    }
})

//Creating a method for comparing the password
personSchema.methods.comparePassword=async function(candidatePassword){
    try{
        //use bcrypt to compare the provided password with the Hashed password
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}

//Creating person model
const Person=mongoose.model('Person',personSchema);

//Exporting the model
module.exports=Person;
