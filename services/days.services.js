const boom=require('@hapi/boom');
const {models}=require('../libs/sequelize')

class DaysServices{
  async create(data){
    try{

      const newDay = await models.Days.create(data);
      return  newDay;
    }catch(err){
      throw boom.internal('Error creating day',{details: err.message})
    }
  };

  async findBy({dayName}){
    try {
      if (dayName){
        const searchedMenusByDay = await models.Days.findOne({where:{dayName:dayName},include:[{model:models.Menus, as:'daysEnabledByMenu'}]});
        if (!searchedMenusByDay){
          throw boom.notFound('Menus by day not found');
        };
        return  searchedMenusByDay;
      } else if(all){
        const allMenus = await models.Days.findAll({include:[{model:models.Menus, as:'daysEnabledByMenu'}]});
        if (!allMenus && allMenus.length > 0) {
          throw boom.notFound('Menus not found');
        };
        return allMenus;
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
    const menusDaysToUpdate= await models.Days.findByPk(id,{include:[{model:models.Menus, as:'daysEnabledByMenu'}]});
      if(!menusDaysToUpdate){
        throw boom.notFound('Menus by date not found')
      };
    try{
      const updatedEnabledMenus= await menusDaysToUpdate.update(changes);
      return updatedEnabledMenus;
    }catch(err){
      if (err.isBoom){
        throw err;
      };
      throw boom.internal('Menus by day update error',{details: err.message})
    };

  };

  async delete(id) {
    const daysToDelete = await models.Days.findByPk(id);
    if (!daysToDelete) {
      throw boom.notFound('Dates not found');
    }
    try {
      await daysToDelete.destroy();
      return daysToDelete;
    } catch (err){
      if (err.isBoom){
        throw err;
      }
      throw boom.internal('Error deleting day',{details: err.message});
    }
  };
};

module.exports = DaysServices;
