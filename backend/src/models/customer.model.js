const mongoose=require('mongoose');


const customerSchema= new mongoose.Schema({
  name:{
  type:String,
  required:[true,"Customer name is required"],
  trim:true,  
  },
  status:{
    type:String,
    enum:['waiting','being-served','completed'],
    default:'waiting',
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

module.exports=mongoose.model('Customer',customerSchema);