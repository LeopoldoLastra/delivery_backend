const express= require('express');
const router = express.Router();
const CateringCompaniesServices = require ('../services/catering.companies.services');
const services = new CateringCompaniesServices();
const validatorHandler=require('../middleware/validator.handler');
const {createCateringComapnies, updateCateringCompanies}=require('../schemas/catering.companies.schema');

router.post('/',
validatorHandler(createCateringComapnies, 'body'),
  async (req,res,next)=>{
    try{
      const data = req.body;
      const newCateringCompany = await services.create(data);
      res.status(201).json({newCateringCompany});
    }catch(err){
      next(err);
    };
});

router.get('/', async (req,res,next)=>{
  try{
    const {id,all,name,userId}= req.query;
    if(id){
      const searchedCateringCompany = await services.findBy({id});
      res.status(200).json(searchedCateringCompany);
    }else if(name){
      const searchedCateringCompany= await services.findBy({name});
      res.status(200).json(searchedCateringCompany);
    }else if(userId){
      const searchedCateringCompany= await services.findBy({userId});
      res.status(200).json(searchedCateringCompany);
    }else if(all){
      const cateringCompanies= await services.findBy({all});
      res.status(200).json(cateringCompanies);
    }
  }catch(err){
    next(err);
  };
});

router.put('/:id',
  validatorHandler( updateCateringCompanies, 'body'),
  async (req,res,next)=>{
  try{
    const {id}= req.params;
    const changes = req.body;
    const updatedCateringCompany = await services.update(id, changes);
    res.status(200).json({message:'El cliente fué actualizado', data:updatedCateringCompany})
  }catch(err){
    next(err);
  };
});

router.delete('/:id', async (req,res,next)=>{
  try{
    const {id}=req.params;
    const deletedCateringCompany = await services.delete(id);
    res.status(204).json({message: `La empresa de catering fué eliminada correctamente`});
  }catch(err){
    next(err);
  };
});

module.exports=router;
