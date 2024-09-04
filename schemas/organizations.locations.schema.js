const Joi=require('joi');

const organizationAddress=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const organizationTel=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const idOrganization=Joi.number().integer().positive();

const createOrganizationsLocations=Joi.object({
  organizationAddress:organizationAddress.required(),
  organizationTel:organizationTel.required(),
  idOrganization:idOrganization.required()
});

const updateOrganizationsLocations=Joi.object({
  organizationAddress:organizationAddress,
  organizationTel:organizationTel,
  idOrganization:idOrganization
});

module.exports={createOrganizationsLocations,updateOrganizationsLocations}
