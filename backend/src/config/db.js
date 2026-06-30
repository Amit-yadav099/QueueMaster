const mongoose=require('mongoose');

const connectDb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected");
    }
    catch(err){
      console.log('mongodb connection error:',err);
      process.exit(1);
    }
}

module.exports=connectDb;
