const Customer=require('../models/customer.model');


// API to get all customers with the requested status
const getCustomers= async(req,res)=>{
    try{
      const {status}=req.query;
      const filter=status ? {status}:{};
      const customers= await Customer.find(filter).sort({createdAt:1});
      res.status(201).json(customers);
      console.log('get customer api is called');
    }
    catch(error){
    res.status(501).json({error:error.message || "server error"});
    } 
};

// APi to add the customers in the db
const addCustomer= async (req,res)=>{
    try{
        const {name}=req.body;
        if(!name){
            return res.status(400).json({error:"Name is required"});
        }
        const customer= new Customer({name});
        await customer.save();
        res.status(201).json({customer});
        console.log('add customer api is called')
    }
    catch(error){
       res.status(500).json({error:'Server error'});
    }
};

//  APi to update the  customer status
const updateStatus=async(req,res)=>{
    try{
        const { id }= req.params;
        const { status } = req.body;

        if(!['waiting','being-served','completed'].includes(status)){
            return res.status(400).json({error:'Invalid status'});
        }

        const customer= await Customer.findByIdAndUpdate(
            id,
            {status},
            {new:true, runValidators:true}
        );
        if(!customer){
            return res.status(404).json({error:"Customer not found"});
        }
        console.log('update customer  APi is called');
         return res.status(201).json(customer);
    }
    catch(error){
        res.status(500).json({error:'Server error'});
    }
};

// api to delete the customer and we get the id via params
const removeCustomer= async(req,res)=>{
    try{
        const { id } = req.params;
        const customer = await Customer.findByIdAndDelete(id);
        if(!customer){
            return res.status(400).json({error:'Customer not found'});
        }
        console.log('remove customer APi is called');  
        res.status(201).json({message:'Customer removed'}); 
    }
    catch(error){
        res.status(500).json({error:'Server error'});
    }
}

module.exports={getCustomers,addCustomer,updateStatus,removeCustomer};
