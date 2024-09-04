const Joi = require('joi');

const cateringCompanyName = Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const cateringCompanyAddress = Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const cateringCompanyCUIT = Joi.string().regex(/^\d{2}-\d{8}-\d{1}$/);
const idUser = Joi.number().integer().positive();
const cateringOrganizations = Joi.array().items(Joi.object({
  idOrganization: Joi.number().integer().positive().required()
}));

const createCateringCompanies = Joi.object({
  cateringCompanyName: cateringCompanyName.required(),
  cateringCompanyAddress: cateringCompanyAddress.required(),
  cateringCompanyCUIT: cateringCompanyCUIT.required(),
  idUser: idUser.required(),
  cateringOrganizations: cateringOrganizations
});

const updateCateringCompanies = Joi.object({
  cateringCompanyName: cateringCompanyName,
  cateringCompanyAddress: cateringCompanyAddress,
  cateringCompanyCUIT: cateringCompanyCUIT,
  idUser: idUser,
  cateringOrganizations: cateringOrganizations
});

module.exports = { createCateringCompanies, updateCateringCompanies };
