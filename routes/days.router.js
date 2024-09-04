const express= require('express');
const router = express.Router();
const DaysServices = require ('../services/days.services');
const services = new DaysServices();

router.post('/',
  async (req,res,next)=>{
    try{
      const data = req.body;
      const newDay = await services.create(data);
      res.status(201).json({message:'Nuevo día: ',data:newDay});
    }catch(err){
      next(err);
    };
});

router.get('/', async (req,res,next)=>{

  //Hasta ahoira solo uso dayName
  try{
    const {dayName}= req.query;
    if(dayName){
      const searchedDay = await services.findBy({dayName});
      res.status(200).json(searchedDay);
    }else if(all){
      const allMenus= await services.findBy({all});
      res.status(200).json({message:'Los días son: ', data:allMenus});
    }
  }catch(err){
    next(err);
  };
});

router.put('/:id',
  async (req,res,next)=>{
  try{
    const {id}= req.params;
    const changes = req.body;
    const updatedEnabledMenus = await services.update(id, changes);
    res.status(200).json({message:'La fecha fué actualizada', data:updatedEnabledMenus})
  }catch(err){
    next(err);
  };
});

router.delete('/:id', async (req,res,next)=>{
  try{
    const {id}=req.params;
    const deletedDay = await services.delete(id);
    res.status(204).json({message: `El día fué eliminado correctamente`});
  }catch(err){
    next(err);
  };
});

module.exports=router;
