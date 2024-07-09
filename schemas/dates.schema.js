const Joi=require('joi');

const fullDate = Joi.date().required();
const day = Joi.number().integer().min(1).max(31).required();
const month = Joi.number().integer().min(1).max(12).required();
const year = Joi.number().integer().min(1900).max(2100).required();
const dayOfWeek = Joi.number().integer().min(1).max(7).required();
const weekOfYear = Joi.number().integer().min(1).max(53).required();
const isWeekend = Joi.boolean().required();
const monthName = Joi.string().valid(
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
).required();
const dayName = Joi.string().valid(
  'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
).required();


const createDates=Joi.object({
  fullDate:fullDate.required(),
  day:day.required(),
  month:month.required(),
  year:year.required(),
  dayOfWeek:dayOfWeek.required(),
  weekOfYear:weekOfYear.required(),
  isWeekend:isWeekend.required(),
  monthName:monthName.required(),
  dayName:dayName.required()
});

const updateDates=Joi.object({
  fullDate:fullDate,
  day:day,
  month:month,
  year:year,
  dayOfWeek:dayOfWeek,
  weekOfYear:weekOfYear,
  isWeekend:isWeekend,
  monthName:monthName,
  dayName:dayName
});

module.exports={createDates,updateDates}
