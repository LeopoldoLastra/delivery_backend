const Joi=require('joi');

const menuName=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const menuDescription=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const menuPrice=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const menuObservations=Joi.number().integer().positive();
const menusDays = Joi.array().items(Joi.object({
  idDay: Joi.number().integer().positive().required()
}));

const createMenus=Joi.object({
  menuName:menuName.required(),
  menuDescription:menuDescription.required(),
  menuPrice:menuPrice.required(),
  menuObservations:menuObservations,
  menusDays:menusDays.required()
});

const updateMenus=Joi.object({
  menuName:menuName,
  menuDescription:menuDescription,
  menuPrice:menuPrice,
  menuObservations:menuObservations,
  menusDays:menusDays
});

module.exports={createMenus,updateMenus}
