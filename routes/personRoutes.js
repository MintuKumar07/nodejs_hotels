const express=require('express');
const router=express.Router();
const Person=require('./../models/person');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');


//post rout to add a person
router.post('/signup',async (req, res)=>{
    try{
        const data=req.body //Assuming the request body contains the person data

        //creat a new person document using the mongoose model
        const newPerson=new Person(data);

        //save the person document to the database
        const response=await newPerson.save();
        console.log('data saved');

        const payload={
            id:response.id,
            username:response.username,
        }
        console.log(JSON.stringify(payload));

        //generate a JWT token for the new person
        const token=generateToken(response.username);
        console.log('Token is: ',token);
        
        //send the token back to the client

        res.status(200).json({response:response,token:token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

//login Route
router.post('/login',async(req,res)=>{
    try{
        //Extract username and password from request body
        const {username,password}=req.body;

        //find the person by username
        const user=await Person.findOne({username:username});

        //if user does not match or does not exists
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid username or password'});
        }

        //generate token
        const payload={
            id: user.id,
            username: user.username
        }
        const token=generateToken(payload);

        //return token as response to the client
        res.status(200).json({token:token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

//Profile Route
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData=req.user;
        console.log('User Data: ',userData);
        const userId=userData.id;
        const user=await Person.findById(userId);
        res.status(200).json({user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

//get method to get the person
router.get('/', jwtAuthMiddleware, async (req,res)=>{
    try{
        const response=await Person.find();
        console.log('data fetched');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

//parameterised get
router.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=='chef' || workType=='manager' || workType=='waiter'){
            const response=await Person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(400).json({error:'Invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

//update
router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatePersonData=req.body;
        
        const response=await Person.findByIdAndUpdate(personId,updatePersonData,{
            new:true,
            runValidators:true,
        });

        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

//delete
router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message: 'person deleted succesfully'});   
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

module.exports=router;