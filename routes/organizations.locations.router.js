const express= require('express');
const router = express.Router();
const OrganizationsLocationsServices = require ('../services/organizations.locations.services');
const services = new OrganizationsLocationsServices();
const validatorHandler=require('../middleware/validator.handler');
const {createOrganizationsLocations, updateOrganizationsLocations}=require('../schemas/organizations.locations.schema');

router.post('/',
validatorHandler(createOrganizationsLocations, 'body'),
  async (req,res,next)=>{
    try{
      const data = req.body;
      const newOrganizationLocation = await services.create(data);
      res.status(201).json({message:'Se creó un nuevo tipo de Organización: ',data:newOrganizationLocation});
    }catch(err){
      next(err);
    };
});

router.get('/', async (req,res,next)=>{
  try{
    const {id,all, organizationId}= req.query;
    if(id){
      const searchedOrganizationLocation = await services.findBy({id});
      res.status(200).json({searchedOrganizationLocation});
    }else if(organizationId){
      const searchedOrganizationLocation= await services.findBy({organizationId});
      res.status(200).json({searchedOrganizationLocation});
    }else if(all){
      const organizationsLocations= await services.findBy({all});
      res.status(200).json({organizationsLocations});
    }
  }catch(err){
    next(err);
  };
});

router.put('/:id',
  validatorHandler(updateOrganizationsLocations, 'body'),
  async (req,res,next)=>{
  try{
    const {id}= req.params;
    const changes = req.body;
    const updatedOranizationLocation = await services.update(id, changes);
    res.status(200).json({updatedOranizationLocation})
  }catch(err){
    next(err);
  };
});

router.delete('/:id', async (req,res,next)=>{
  try{
    const {id}=req.params;
    const deletedOrganizationLocation = await services.delete(id);
    res.status(204).json({message: `La localización de la organización ${deletedOrganizationLocation.organizationLocationName} fué eliminada correctamente`});
  }catch(err){
    next(err);
  };
});

module.exports=router;
