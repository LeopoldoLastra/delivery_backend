const Joi=require('joi');

const userName = Joi.string().email().messages({
  'string.email': 'El nombre de usuario debe ser un correo electrónico válido.'
});

const password = Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).messages({
  'string.pattern.base': 'La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial.'
});

const userType = Joi.string().valid('comensal', 'tutor', 'organizacion', 'catering').messages({
  'any.only': 'El tipo de usuario debe ser uno de los siguientes: comensal, tutor, organizacion, catering.'
});


const active=Joi.number().integer().positive();

const createUser=Joi.object({
  userName:userName.required().messages({'any.required': 'El nombre de usuario es requerido.'}),
  password:password.required().messages({'any.required': 'La contraseña es requerida.'}),
  userType:userType.required(),
  active:active
});

const updateUser=Joi.object({
  userName:userName,
  password:password,
  userType:userType,
  active:active,
});

module.exports={createUser,updateUser}
