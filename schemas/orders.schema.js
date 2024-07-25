const Joi=require('joi');

const idCustomer=Joi.number().integer().positive();
const orderedMenus = Joi.array().items(Joi.object({
  idMenu: Joi.number().integer().positive().required(),
  date: Joi.date().iso()
}));
const month = Joi.string().valid('enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre');
const year = Joi.number().integer(4)

const createOrders=Joi.object({
  idCustomer:idCustomer.required(),
  orderedMenus:orderedMenus.required(),
  month:month.required(),
  year:year.required()
});

const updateOrders=Joi.object({
  orderedMenus:orderedMenus,
  idCustomer:idCustomer,
  month:month,
  year:year
});

module.exports={createOrders,updateOrders}
