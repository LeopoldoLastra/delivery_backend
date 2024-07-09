const boom=require('@hapi/boom')
const {models}=require('../libs/sequelize')

class DatesServices{
  async create(data){
    try{
      const newDate = await models.Dates.create(data);
      return  newDate;
    }catch(err){
      throw boom.internal('Error creating date',{details: err.message})
    }
  };

  async findBy({day,monthName,year,all}){
    try {
      if (day && monthName && year){
        const searchedDate = await models.Dates.findOne({where:{day:day,monthName:monthName,year:year }});
        if (!searchedDate){
          throw boom.notFound('Customer not found');
        };
        return searchedDate;
      } else if(all){
        const dates = await models.Dates.findAll();
        if (!dates && dates.length > 0) {
          throw boom.notFound('Dates not found');
        };
        return dates;
      } else{
        throw boom.badRequest('Invalid query parameters');
      }
    }catch (err){
      if (err.isBoom) {
        throw err;
      }
      throw boom.internal('Error fetching the order(s)', { details: err.message });
    };
  };


  async update(id,changes){
    const orderToUpdate= await models.Dates.findByPk(id);
      if(!orderToUpdate){
        throw boom.notFound('Order not found')
      };
    try{
      const updatedOrder= await orderToUpdate.update(changes);
      return updatedOrder;
    }catch(err){
      if (err.isBoom){
        throw err;
      };
      throw boom.internal('Order update error',{details: err.message})
    };

  };

  async delete(id) {
    const datesToDelete = await models.Dates.findByPk(id);
    if (!datesToDelete) {
      throw boom.notFound('Dates not found');
    }
    try {
      await datesToDelete.destroy();
      return datesToDelete;
    } catch (err){
      if (err.isBoom){
        throw err;
      }
      throw boom.internal('Error deleting the dates',{details: err.message});
    }
  };
};

module.exports = DatesServices;
