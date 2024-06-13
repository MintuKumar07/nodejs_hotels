const express=require('express');
const router=express.Router();

// Require Item model in our routes module
const MenuItem = require('./../models/menu');


//post method to add menu item
router.post('/',async (req,res)=>{
    try{
        const data=req.body; 
        const newMenu=new MenuItem(data);
        const response=await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

//get method to get menu Items
router.get('/',async (req,res)=>{
    try{
        const response=await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

//parameterised taste
router.get('/:taste',async(req,res)=>{
    try{
        const taste=req.params.taste;
        if(taste=='sour' || taste=='sweet' || taste=='spicy'){
            const response=await MenuItem.find({taste:taste});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(400).json({error:'Invalid taste type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

//exporting the router nodule
module.exports=router;
