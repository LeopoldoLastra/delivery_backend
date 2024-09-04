const express= require('express');
const router = express.Router();
const OrganizationsTypesServices = require ('../services/organizations.types.services');
const services = new OrganizationsTypesServices();
const validatorHandler=require('../middleware/validator.handler');
const {createOrganizationsTypes, updateOrganizationsTypes}=require('../schemas/organizations.types.schema');

router.post('/',
validatorHandler(createOrganizationsTypes, 'body'),
  async (req,res,next)=>{
    try{
      const data = req.body;
      const newOrganizationType = await services.create(data);
      res.status(201).json({message:'Se creó un nuevo tipo de Organización: ',data:newOrganizationType});
    }catch(err){
      next(err);
    };
});

router.get('/', async (req,res,next)=>{
  try{
    const {id,all}= req.query;
    if(id){
      const searchedOrganizationType = await services.findBy({id});
      res.status(200).json({searchedOrganizationType});
    }else if(all){
      const organizationsTypes= await services.findBy({all});
      res.status(200).json({organizationsTypes});
    }
  }catch(err){
    next(err);
  };
});

router.put('/:id',
  validatorHandler(updateOrganizationsTypes, 'body'),
  async (req,res,next)=>{
  try{
    const {id}= req.params;
    const changes = req.body;
    const updatedOranizationType = await services.update(id, changes);
    res.status(200).json({updatedOranizationType})
  }catch(err){
    next(err);
  };
});

router.delete('/:id', async (req,res,next)=>{
  try{
    const {id}=req.params;
    const deletedOrganizationType = await services.delete(id);
    res.status(204).json({message: `El tipo de organización ${deletedOrganizationType.organizationTypeName} fué eliminada correctamente`});
  }catch(err){
    next(err);
  };
});

module.exports=router;
