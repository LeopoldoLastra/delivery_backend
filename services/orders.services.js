const boom=require('@hapi/boom');
const {models}=require('../libs/sequelize');
const sequelize = require('../libs/sequelize');

class OrdersServices{
  async create(data){
    const transaction = await sequelize.transaction();

    try{
      const newOrder = await models.Orders.create(data,{transaction});
      const selectedMenus=data.orderedMenus;

      if(selectedMenus && selectedMenus.length>0){
        const addedMenus = selectedMenus.map(menu => ({
          idOrder: newOrder.idOrder,
          idMenu: menu.idMenu,
          date:  menu.date
        }));
        await models.MenusOrders.bulkCreate(addedMenus,  {transaction});
      }
      await transaction.commit();
      return  newOrder;
    }catch(err){
      await transaction.rollback();
      throw boom.internal('Error creating the customer',{details: err.message})
    }
  };

  async findBy({id,all,idCustomer,month,year}){
    try {
      if (id){
        const searchedOrder = await models.Orders.findByPk(id,{include:[{model:models.Customers,as:'orderbyCustomer', include:[{model:models.Organizations,as:'customerOrganization'}]},
                                                                        {model:models.Menus,as:'orderedMenus'}
                                                                        ]
                                                              });
        if (!searchedOrder){
          throw boom.notFound('Customer not found');
        };
        return searchedOrder;
      } else if(idCustomer,month,year){
        const orders = await models.Orders.findAll({where:{idCustomer:idCustomer,year:year,month:month},include:[{model:models.Menus,as:'orderedMenus'}]});
        if (!orders) {
          throw boom.notFound('Orders not found');
        };
        return orders;
      } else if(all){
        const orders = await models.Orders.findAll({include:[{model:models.Customers,as:'orderbyCustomer'},
                                                             {model:models.Menus,as:'orderedMenus'}
                                                              ]
                                                    });
        if (!orders && orders.length > 0) {
          throw boom.notFound('Orders not found');
        };
        return orders;
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
    const orderToUpdate= await models.Orders.findByPk(id);
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
    const orderToDelete = await models.Orders.findByPk(id);
    if (!orderToDelete) {
      throw boom.notFound('Order not found');
    }
    try {
      await orderToDelete.destroy();
      return orderToDelete;
    } catch (err){
      if (err.isBoom){
        throw err;
      }
      throw boom.internal('Error deleting the order',{details: err.message});
    }
  };
};

module.exports = OrdersServices;
