const express= require('express');
const router = express.Router();
const boom=require('@hapi/boom')
const sequelize = require('../libs/sequelize');


async function get_customers_by_catering_company({idCateringCompany}) {
  try {idCateringCompany
    if (idCateringCompany) {
      const [results, metadata] = await sequelize.query(
        'SELECT * FROM get_customers_by_catering_company(:idCateringCompany)',
        {replacements:{idCateringCompany}}
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
    throw boom.internal('Error fetching the customer(s)', { details: err.message });
  }
};


router.get('/', async (req,res,next)=>{
  try{
    const {idCateringCompany }= req.query;
    if(idCateringCompany  ){
      const cateringCompanyCustomers= await  get_customers_by_catering_company({idCateringCompany });
      res.status(200).json( cateringCompanyCustomers);
    }
  }catch(err){
    next(err);
  };
});



module.exports=router;
