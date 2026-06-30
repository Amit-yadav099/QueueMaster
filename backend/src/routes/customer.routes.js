const express=require('express');
const router=express.Router();

const {getCustomers,addCustomer,updateStatus,removeCustomer}=require('../controllers/customer.controller');

router.get('/',getCustomers);
router.post('/',addCustomer);
router.patch('/:id/status',updateStatus);
router.delete('/:id',removeCustomer);

module.exports=router;
