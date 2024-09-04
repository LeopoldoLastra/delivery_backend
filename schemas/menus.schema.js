const Joi=require('joi');

const menuName=Joi.string().regex(/^[\w\s\-,.áéíóúÁÉÍÓÚñÑ()]+$/);
const menuDescription = Joi.string().regex(/^[\w\s\-,.áéíóúÁÉÍÓÚñÑ()]+$/).allow('');
const menuPrice=Joi.number().integer().positive();
const menuObservations=Joi.string().regex(/^[\w\s\-,.áéíóúÁÉÍÓÚñÑ()]+$/).allow('');
const idCateringCompany=Joi.number().integer().positive();
const menusDays = Joi.array().items(Joi.object({
  idDay: Joi.number().integer().positive().required()
}));

const createMenus=Joi.object({
  menuName:menuName.required(),
  menuDescription:menuDescription,
  menuPrice:menuPrice.required(),
  menuObservations:menuObservations,
  idCateringCompany:idCateringCompany.required(),
  menusDays:menusDays.required()
});

const updateMenus=Joi.object({
  menuName:menuName,
  menuDescription:menuDescription,
  menuPrice:menuPrice,
  menuObservations:menuObservations,
  idCateringCompany:idCateringCompany,
  menusDays:menusDays
});

module.exports={createMenus,updateMenus}
