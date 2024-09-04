const express= require('express');
const router = express.Router();
const boom=require('@hapi/boom')
const {models}=require('../libs/sequelize');
const sequelize = require('../libs/sequelize');


async function get_menus_by_catering_company_by_day({ day_id, catering_companie }) {
  try {
    if (day_id && catering_companie) {
      // Ejecuta la consulta a la función de PostgreSQL
      const [results, metadata] = await sequelize.query(
        'SELECT * FROM get_menus_by_catering_company_by_day(:day_id, :catering_companie)',
        {
          replacements: { day_id,catering_companie }
        }
      );

      if (!results || results.length === 0) {
        throw boom.notFound('No data found');
      }


      return results;
    } else {
      throw boom.badRequest('Missing required query parameters');
    }
  } catch (err) {
    if (err.isBoom) {
      throw err;
    }
    throw boom.internal('Error fetching the organization(s)', { details: err.message });
  }
};


router.get('/', async (req,res,next)=>{
  try{
    const {day_id, catering_companie }= req.query;

    if(day_id && catering_companie ){
      const enableMenus= await  get_menus_by_catering_company_by_day({ day_id, catering_companie });
      res.status(200).json( enableMenus);
    }
  }catch(err){
    next(err);
  };
});



module.exports=router;
