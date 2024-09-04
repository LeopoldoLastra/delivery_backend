const boom=require('@hapi/boom')
const {models}=require('../libs/sequelize');
const sequelize = require('../libs/sequelize');

class MenusServices{
  async create(data){
    const transaction = await sequelize.transaction();
    try{
      const newMenu = await models.Menus.create(data,{transaction});

      const menusDays = data.menusDays;

      if (menusDays && menusDays.length > 0) {
        const enableMenuByDay = menusDays.map(day => ({
          idMenu: newMenu.idMenu,
          idDay: day.idDay
        }));
        await models.MenusDays.bulkCreate(enableMenuByDay,  {transaction});
      }

      await transaction.commit();
      return newMenu;
    }catch(err){
      await transaction.rollback();
      throw boom.internal('Error creating the menu',{details: err.message})
    }
  };

  async findBy({id,all,name, cateringCompanyId}){
    try {
      if (id){
        const searchedMenu = await models.Menus.findByPk(id);
        if (!searchedMenu){
          throw boom.notFound('Menu not found');
        };
        return searchedMenu;
      } else if (cateringCompanyId){
        const searchedMenu = await models.Menus.findAll({where:{idCateringCompany:cateringCompanyId},
                                                        attributes: { exclude: ['createdAt','updatedAt']},
                                                        include:[{model:models.Days,
                                                                  as:'menusDays',
                                                                  through:{attributes:['enabled']},
                                                                  attributes: { exclude: ['createdAt','updatedAt','idMenuDay']}
                                                                }]
                                                          });
        if (!searchedMenu){
          throw boom.notFound('Menus not found');
        };
        return searchedMenu;
      }else if (all){
        const menus = await models.Menus.findAll();
        if (!menus && menus.length > 0) {
          throw boom.notFound('Menus not found');
        };
        return menus;
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


  async update(id, changes) {
    const menuToUpdate = await models.Menus.findByPk(id);
    if (!menuToUpdate) {
      throw boom.notFound('Menu not found');
    }

    const transaction = await sequelize.transaction();

    try {
      const updatedMenu = await menuToUpdate.update(changes, { transaction });

      if (changes.menusDays) {
        await models.MenusDays.destroy({where: { idMenu: id },transaction});

        const enableMenuByDay = changes.menusDays.map(day => ({idMenu: id,idDay: day.idDay}));

        await models.MenusDays.bulkCreate(enableMenuByDay, { transaction });
      }
      await transaction.commit();
      return updatedMenu;
    } catch (err) {
      await transaction.rollback();
      if (err.isBoom) {
        throw err;
      }
      throw boom.internal('Menu update error', { details: err.message });
    }
  }

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

