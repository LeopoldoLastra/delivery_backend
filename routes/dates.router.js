const express= require('express');
const router = express.Router();
const DatesServices = require ('../services/dates.services');
const services = new DatesServices();
const validatorHandler=require('../middleware/validator.handler');
const {createDates,updateDates}=require('../schemas/dates.schema');

router.post('/',
validatorHandler(createDates, 'body'),
  async (req,res,next)=>{
    try{
      const data = req.body;
      const newDate = await services.create(data);
      res.status(201).json({message:'Se agregó una nueva fecha: ',data:newDate});
    }catch(err){
      next(err);
    };
});

router.get('/', async (req,res,next)=>{
  try{
    const {day,monthName,year,all}= req.query;
    if(day&&monthName&&year){
      const searchedDate = await services.findBy({day,monthName,year});
      res.status(200).json({message:'La fecha es: ', data:searchedDate});
    }else if(all){
      const dates= await services.findBy({all});
      res.status(200).json({message:'Las fechas existentes son: ', data:dates});
    }
  }catch(err){
    next(err);
  };
});

router.put('/:id',
  validatorHandler(updateDates, 'body'),
  async (req,res,next)=>{
  try{
    const {id}= req.params;
    const changes = req.body;
    const updatedDate = await services.update(id, changes);
    res.status(200).json({message:'La fecha fué actualizada', data:updatedDate})
  }catch(err){
    next(err);
  };
});

router.delete('/:id', async (req,res,next)=>{
  try{
    const {id}=req.params;
    const deletedDate = await services.delete(id);
    res.status(204).json({message: `La fecha ${deletedDate.fullDate} fué eliminado correctamente`});
  }catch(err){
    next(err);
  };
});

module.exports=router;
