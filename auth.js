const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Person=require('./models/person');

passport.use(new LocalStrategy(async (username,password,done)=>{
    //we will write authetication logic here
    try{
      //console.log('Received Credentials',username,password);
      const user=await Person.findOne({username:username});
      if(!user){
        return done(null,false,{message:'Invalid username'});
      };
      const isPasswordMatch= await user.comparePassword(password);
      if(isPasswordMatch){
        return done(null,user);
      }
      else{
        return done(null,false,{message:'Invalid password'});
      }
    }
    catch(err){
      return done(err);
    }
  }))

  module.exports=passport;