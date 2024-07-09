const Joi=require('joi');

const organizationName=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const organizationAddress=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);

const createOrganizations=Joi.object({
  organizationName:organizationName.required(),
  organizationAddress:organizationAddress.required()
});

const updateOrganizations=Joi.object({
  organizationName:organizationName,
  organizationAddress:organizationAddress
});

module.exports={createOrganizations,updateOrganizations}
