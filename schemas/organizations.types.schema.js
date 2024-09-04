const Joi=require('joi');

const organizationTypeName=Joi.string().regex(/^[\w\s\-\/\(\)]+$/)

const createOrganizationsTypes=Joi.object({
  organizationTypeName:organizationTypeName.required()
});

const updateOrganizationsTypes=Joi.object({
  organizationTypeName:organizationTypeName
});

module.exports={createOrganizationsTypes,updateOrganizationsTypes}
