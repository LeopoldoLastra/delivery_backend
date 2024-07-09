const express= require('express');
const router = express.Router();
const OrganizationsServices = require ('../services/organizations.services');
const services = new OrganizationsServices();
const validatorHandler=require('../middleware/validator.handler');
const {createOrganizations, updateOrganizations}=require('../schemas/organizations.schema');

router.post('/',
validatorHandler(createOrganizations, 'body'),
  async (req,res,next)=>{
    try{
      const data = req.body;
      const newOrganization = await services.create(data);
      res.status(201).json({message:'Se creó la Organización: ',data:newOrganization});
    }catch(err){
      next(err);
    };
});

router.get('/', async (req,res,next)=>{
  try{
    const {id,all}= req.query;
    if(id){
      const searchedOrganization = await services.findBy({id});
      res.status(200).json({message:'La organización buscada es ', data:searchedOrganization});
    }else if(all){
      const organizations= await services.findBy({all});
      res.status(200).json({message:'Las organizaciones encontradas son: ', data:organizations});
    }
  }catch(err){
    next(err);
  };
});

router.put('/:id',
  validatorHandler(updateOrganizations, 'body'),
  async (req,res,next)=>{
  try{
    const {id}= req.params;
    const changes = req.body;
    const updatedOranization = await services.update(id, changes);
    res.status(200).json({message:'La organización fué actualizada', data:updatedOranization})
  }catch(err){
    next(err);
  };
});

router.delete('/:id', async (req,res,next)=>{
  try{
    const {id}=req.params;
    const deletedOrganization = await services.delete(id);
    res.status(204).json({message: `La organización ${deletedOrganization.organizationName} fué eliminada correctamente`});
  }catch(err){
    next(err);
  };
});

module.exports=router;
