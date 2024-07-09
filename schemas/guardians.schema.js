const Joi=require('joi');

const guardianName=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const guardianLastName=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);
const guardianDNI=Joi.string().regex(/^[\w\s\-\/\(\)]+$/);

const createGuardians=Joi.object({
  guardianName:guardianName.required(),
  guardianLastName:guardianLastName.required(),
  guardianDNI:guardianDNI.required()
});

const updateGuardians=Joi.object({
  guardianName:guardianName,
  guardianLastName:guardianLastName,
  guardianDNI:guardianDNI
});

module.exports={createGuardians,updateGuardians}
