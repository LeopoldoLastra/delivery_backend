const boom=require('@hapi/boom')
const {models}=require('../libs/sequelize')

class MenusServices{
  async create(data){
    try{
      const newMenu = await models.Menus.create(data);
      return newMenu;
    }catch(err){
      throw boom.internal('Error creating the menu',{details: err.message})
    }
  };

  async findBy({id,all,name}){
    try {
      if (id){
        const searchedMenu = await models.Menus.findByPk(id,{include:[{model:models.Orders,as:'menusByOrder'},
                                                                              {model:models.Customers,as:'orderbyCustomer'}
                                                                            ]});
        if (!searchedMenu){
          throw boom.notFound('Menu not found');
        };
        return searchedMenu;
      } else if (name){
        const searchedMenu = await models.Menus.findOne({where:{menuName:name},
                                                                  include:[{model:models.Orders,as:'menusByOrder'},
                                                                          {model:models.Customers,as:'orderbyCustomer'}]});
        if (!searchedMenu){
          throw boom.notFound('Customer not found');
        };
        return searchedMenu;
      }else if (all){
        const menus = await models.Menus.findAll({include:[{model:models.Orders,as:'menusByOrder'},
                                                                   {model:models.Customers,as:'orderbyCustomer'}]});
        if (!menus && menus.length > 0) {
          throw boom.notFound('Menus not found');
        };
        return customers;
      } else{
        throw boom.badRequest('Invalid query parameters');
      }
    }catch (err){
      if (err.isBoom) {
        throw err;
      }
      throw boom.internal('Error fetching the menus(s)', { details: err.message });
    };
  };


  async update(id,changes){
    const menuToUpdate= await models.Menus.findByPk(id);
      if(!menuToUpdate){
        throw boom.notFound('Menu not found')
      };
    try{
      const updatedMenu= await menuToUpdate.update(changes);
      return updatedMenu;
    }catch(err){
      if (err.isBoom){
        throw err;
      };
      throw boom.internal('Menu update error',{details: err.message})
    };

  };

  async delete(id) {
    const menuToDelete = await models.Menus.findByPk(id);
    if (!menuToDelete) {
      throw boom.notFound('Menu not found');
    }
    try {
      await menuToDelete.destroy();
      return menuToDelete;
    } catch (err){
      if (err.isBoom){
        throw err;
      }
      throw boom.internal('Error deleting the menu',{details: err.message});
    }
  };
};

module.exports = MenusServices;

