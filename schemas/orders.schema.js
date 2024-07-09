const Joi=require('joi');

const idCustomer=Joi.number().integer().positive();

const createOrders=Joi.object({
  idCustomer:idCustomer.required(),
});

const updateOrders=Joi.object({
  idCustomer:idCustomer
});

module.exports={createOrders,updateOrders}
