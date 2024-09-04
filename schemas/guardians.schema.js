const Joi=require('joi');

const guardianName=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const guardianLastName=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const guardianDNI=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const idUser= Joi.number().integer();

const createGuardians=Joi.object({
  guardianName:guardianName.required(),
  guardianLastName:guardianLastName.required(),
  guardianDNI:guardianDNI.required(),
  idUser:idUser
});

const updateGuardians=Joi.object({
  guardianName:guardianName,
  guardianLastName:guardianLastName,
  guardianDNI:guardianDNI,
  idUser:idUser
});

module.exports={createGuardians,updateGuardians}
