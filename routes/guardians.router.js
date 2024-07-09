const express= require('express');
const router = express.Router();
const GuardiansServices = require ('../services/guardians.services');
const services = new GuardiansServices();
const validatorHandler=require('../middleware/validator.handler');
const {createGuardians,updateGuardians}=require('../schemas/guardians.schema');

router.post('/',
validatorHandler(createGuardians, 'body'),
  async (req,res,next)=>{
    try{
      const data = req.body;
      const newGuardian = await services.create(data);
      res.status(201).json({message:'Se generó un nuevo tutor: ',data:newGuardian});
    }catch(err){
      next(err);
    };
});

router.get('/', async (req,res,next)=>{
  try{
    const {id,all,dni}= req.query;
    if(id){
      const searchedGuardian = await services.findBy({id});
      res.status(200).json({message:'El tutor buscado es ', data:searchedGuardian});
    }else if(dni){
      const searchedGuardian= await services.findBy({dni});
      res.status(200).json({message:'El tutor buscado es: ', data:searchedGuardian});
    }else if(all){
      const guardians= await services.findBy({all});
      res.status(200).json({message:'Los tutores encontrados son: ', data:guardians});
    }
  }catch(err){
    next(err);
  };
});

router.put('/:id',
  validatorHandler(updateGuardians, 'body'),
  async (req,res,next)=>{
  try{
    const {id}= req.params;
    const changes = req.body;
    const updatedGuardian = await services.update(id, changes);
    res.status(200).json({message:'El tutor fué actualizado', data:updatedGuardian})
  }catch(err){
    next(err);
  };
});

router.delete('/:id', async (req,res,next)=>{
  try{
    const {id}=req.params;
    const deletedGuardian = await services.delete(id);
    res.status(204).json({message: `El tutor ${deletedGuardian.gurdianDNI} fué eliminado correctamente`});
  }catch(err){
    next(err);
  };
});

module.exports=router;
