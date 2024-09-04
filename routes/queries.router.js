const express= require('express');
const router = express.Router();
const boom=require('@hapi/boom')
const {models}=require('../libs/sequelize');
const sequelize = require('../libs/sequelize');


async function getMenusToPrepare({ organizationId, startDate, endDate }) {
  try {
    if (organizationId && startDate && endDate) {
      // Ejecuta la consulta a la función de PostgreSQL
      const [results, metadata] = await sequelize.query(
        'SELECT * FROM get_menus_to_prepare(:organizationId, :startDate, :endDate)',
        {
          replacements: { organizationId, startDate, endDate }
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
    const {organizationId, startDate, endDate }= req.query;
    if(organizationId && startDate && endDate ){
      const numberOfMenusPerOrganization= await  getMenusToPrepare({ organizationId, startDate, endDate });
      res.status(200).json( numberOfMenusPerOrganization);
    }
  }catch(err){
    next(err);
  };
});



module.exports=router;
