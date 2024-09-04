const express= require('express');
const router = express.Router();
const UsersServices = require ('../services/users.services');
const services = new UsersServices();
const validatorHandler=require('../middleware/validator.handler');
const {createUser, updateUser}=require('../schemas/users.schema');

router.post('/',
validatorHandler(createUser, 'body'),
  async (req,res,next)=>{
    try{
      const data = req.body;
      const newUserName = await services.create(data);
      res.status(201).json({newUserName});
    }catch(err){
      next(err);
    };
});

router.get('/', async (req,res,next)=>{
  try{
    const {id,all, user}= req.query;
    if(id){
      const searchedUser = await services.findBy({id});
      res.status(200).json({searchedUser});
    }else if(user){
      const searchedUser= await services.findBy({user});
      res.status(200).json({searchedUser});
    }
    else if(all){
      const users= await services.findBy({all});
      res.status(200).json({users});
    }
  }catch(err){
    next(err);
  };
});

router.put('/:id',
  validatorHandler(updateUser, 'body'),
  async (req,res,next)=>{
  try{
    const {id}= req.params;
    const changes = req.body;
    const updatedUser = await services.update(id, changes);
    res.status(200).json({updatedUser})
  }catch(err){
    next(err);
  };
});

router.delete('/:id', async (req,res,next)=>{
  try{
    const {id}=req.params;
    const deletedUser = await services.delete(id);
    res.status(204).json({message: `El usuario ${deletedUser.userName} fué eliminado correctamente`});
  }catch(err){
    next(err);
  };
});

module.exports=router;
