const express= require('express');
const router = express.Router();
const CustomersServices = require ('../services/customer.services');
const services = new CustomersServices();
const validatorHandler=require('../middleware/validator.handler');
const {createCustomers, updateCustomers}=require('../schemas/customers.schema');

router.post('/',
validatorHandler(createCustomers, 'body'),
  async (req,res,next)=>{
    try{
      const data = req.body;
      const newCustomer = await services.create(data);
      res.status(201).json({message:'Se generó un nuevo Cliente: ',data:newCustomer});
    }catch(err){
      next(err);
    };
});

router.get('/', async (req,res,next)=>{
  try{
    const {id,all,dni}= req.query;
    if(id){
      const searchedCustomer = await services.findBy({id});
      res.status(200).json({data:searchedCustomer});
    }else if(dni){
      const searchedCustomer= await services.findBy({dni});
      res.status(200).json({data:searchedCustomer});
    }else if(all){
      const customers= await services.findBy({all});
      res.status(200).json({data:customers});
    }
  }catch(err){
    next(err);
  };
});

router.put('/:id',
  validatorHandler(updateCustomers, 'body'),
  async (req,res,next)=>{
  try{
    const {id}= req.params;
    const changes = req.body;
    const updatedCustomer = await services.update(id, changes);
    res.status(200).json({message:'El cliente fué actualizado', data:updatedCustomer})
  }catch(err){
    next(err);
  };
});

router.delete('/:id', async (req,res,next)=>{
  try{
    const {id}=req.params;
    const deletedCustomer = await services.delete(id);
    res.status(204).json({message: `El cliente ${deletedCustomer.customerDNI} fué eliminado correctamente`});
  }catch(err){
    next(err);
  };
});

module.exports=router;
