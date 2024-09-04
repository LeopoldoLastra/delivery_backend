const express= require('express');
const router = express.Router();
const OrdersServices = require ('../services/orders.services');
const services = new OrdersServices();
const validatorHandler=require('../middleware/validator.handler');
const {createOrders,updateOrders}=require('../schemas/orders.schema');


//UTILIZO EL POST DE ORDER
router.post('/',
validatorHandler(createOrders, 'body'),
  async (req,res,next)=>{
    try{
      const data = req.body;
      const newOrder = await services.create(data);
      res.status(201).json({message:'Se generó una nueva orden: ',data:newOrder});
    }catch(err){
      next(err);
    };
});


router.get('/', async (req,res,next)=>{
//Por ahora solo uso por idCustomer,month,year

try{
  const {id,all,idCateringCompany,idCustomer,month,year,paid,delivered}= req.query;

  if(paid || paid==0 && idCateringCompany){
    const orders= await services.findBy({idCateringCompany,month,year,paid});
    res.status(200).json(orders);
  }else if(paid || paid==0){
    const orders= await services.findBy({idCustomer,month,year,paid});
    res.status(200).json(orders);
  }else if(delivered || delivered==0){
    const orders= await services.findBy({idCustomer,month,year, delivered});
    res.status(200).json(orders);
  }else if(idCateringCompany){
    const orders= await services.findBy({idCateringCompany,month,year});
    res.status(200).json(orders);
  }else if(id){
    const searchedOrder = await services.findBy({id});
    res.status(200).json(searchedOrder);
  }else if(idCustomer){
    const orders= await services.findBy({idCustomer,month,year});
    res.status(200).json(orders);
  }else if(all){
    const orders= await services.findBy({all});
    res.status(200).json({message:'Las ordenes existentes son: ', data:orders});
  }


}catch(err){
    next(err);
  };
});



router.put('/:id',
  validatorHandler(updateOrders, 'body'),
  async (req,res,next)=>{
  try{
    const {id}= req.params;
    const changes = req.body;
    const updatedOrder = await services.update(id, changes);
    res.status(200).json({message:'El cliente fué actualizado', data:updatedOrder})
  }catch(err){
    next(err);
  };
});

router.delete('/:id', async (req,res,next)=>{
  try{
    const {id}=req.params;
    const deletedOrder = await services.delete(id);
    res.status(204).json({message: `El cliente ${deletedOrder.orderId} fué eliminado correctamente`});
  }catch(err){
    next(err);
  };
});

module.exports=router;
