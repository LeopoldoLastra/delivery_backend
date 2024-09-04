const express= require('express');
const router = express.Router();
const MenusServices = require ('../services/menus.services');
const services = new MenusServices();
const validatorHandler=require('../middleware/validator.handler');
const {createMenus,updateMenus}=require('../schemas/menus.schema');


//Uso el create
router.post('/',
validatorHandler(createMenus, 'body'),
  async (req,res,next)=>{
    try{
      const data = req.body;
      const newMenu = await services.create(data);
      res.status(201).json({message:'Se creó un nuevo Menú: ',data:newMenu});
    }catch(err){
      next(err);
    };
});

//Por ahora solo use cateringCompanyIds
router.get('/', async (req,res,next)=>{
  try{
    const {id,all,name, cateringCompanyId}= req.query;
    if(id){
      const searchedMenu = await services.findBy({id});
      res.status(200).json({message:'El menú buscado es ', data:searchedMenu});
    }else if(cateringCompanyId){
      const searchedMenu= await services.findBy({cateringCompanyId});
      res.status(200).json(searchedMenu);
    }else if(all){
      const menus= await services.findBy({all});
      res.status(200).json({message:'Los menús encontradas son: ', data:menus});
    }
  }catch(err){
    next(err);
  };
});


//Uso el update
router.put('/:id',
  validatorHandler(updateMenus, 'body'),
  async (req,res,next)=>{
  try{
    const {id}= req.params;
    const changes = req.body;
    const updatedMenu = await services.update(id, changes);
    res.status(200).json({message:'El menú fué actualizado', data:updatedMenu})
  }catch(err){
    next(err);
  };
});

router.delete('/:id', async (req,res,next)=>{
  try{
    const {id}=req.params;
    const deletedMenu = await services.delete(id);
    res.status(204).json({message: `El menú ${deletedCustomer.customerDNI} fué eliminado correctamente`});
  }catch(err){
    next(err);
  };
});

module.exports=router;
