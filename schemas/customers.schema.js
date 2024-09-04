const Joi=require('joi');

const customerName=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const customerLastName=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const customerDNI=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const idOrganization=Joi.number().integer().positive();
const idGuardian=Joi.number().integer().positive();
const idUser=Joi.number().integer().positive();



const createCustomers=Joi.object({
  customerName:customerName.required(),
  customerLastName:customerLastName.required(),
  customerDNI:customerDNI.required(),
  idOrganization:idOrganization.required(),
  idUser:idUser.required(),
  idGuardian:idGuardian
});

const updateCustomers=Joi.object({
  customerName:customerName,
  customerLastName:customerLastName,
  customerDNI:customerDNI,
  idOrganization:idOrganization,
  idGuardian:idGuardian,
  idUser:idUser


});

module.exports={createCustomers,updateCustomers}




