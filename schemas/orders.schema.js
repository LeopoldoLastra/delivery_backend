const Joi=require('joi');

const idCustomer=Joi.number().integer().positive();
const idCateringCompany=Joi.number().integer().positive();
const orderedMenus = Joi.array().items(Joi.object({
  idMenu: Joi.number().integer().positive().required(),
  date: Joi.date().iso()
}));
const month = Joi.string().valid('enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre');
const year = Joi.number().integer(4);
const paid = Joi.number().integer().valid(0, 1);
const delivered = Joi.number().integer().valid(0, 1);

const createOrders=Joi.object({
  idCustomer:idCustomer.required(),
  idCateringCompany:idCateringCompany.required(),
  orderedMenus:orderedMenus.required(),
  month:month.required(),
  year:year.required(),
  paid:paid,
  delivered:delivered
});

const updateOrders=Joi.object({
  orderedMenus:orderedMenus,
  idCustomer:idCustomer,
  idCateringCompany:idCateringCompany,
  month:month,
  year:year,
  paid:paid,
  delivered:delivered
});

module.exports={createOrders,updateOrders}
