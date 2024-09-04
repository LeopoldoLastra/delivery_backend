const Joi=require('joi');


const organizationName=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const organizationContactName=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const organizationContactTel=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const idOrganizationType=Joi.number().integer().positive();
const organizationLocation = Joi.array().items(Joi.object({
  organizationAddress: Joi.string().regex(/^[\w\s\-\/\(\)]+$/),
  organizationTel: Joi.string().regex(/^[\w\s\-\/\(\)]+$/)
}));
const cateringOrganizations = Joi.array().items(Joi.object({
  idCateringCompany: Joi.number().integer().positive()
}));

const createOrganizations=Joi.object({
  organizationName:organizationName.required(),
  organizationContactName:organizationContactName.required(),
  organizationContactTel:organizationContactTel.required(),
  idOrganizationType:idOrganizationType.required(),
  organizationLocation:organizationLocation,
  cateringOrganizations:cateringOrganizations.required()
});

const updateOrganizations=Joi.object({
  organizationName:organizationName,
  organizationContactName:organizationContactName,
  organizationContactTel:organizationContactTel,
  idOrganizationType:idOrganizationType,
  organizationLocation:organizationLocation,
  cateringOrganizations:cateringOrganizations
});

module.exports={createOrganizations,updateOrganizations}
