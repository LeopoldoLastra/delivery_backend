const{Model, DataTypes, sequelize}=require('sequelize');

const MENUS_ORDERS_TABLE = `menus_orders`;

const MenusOrdersSchema ={
  idMenuOrder:{
    allowNull:false,
    primaryKey:true,
    type: DataTypes.INTEGER,
    autoIncrement:true,
    field: 'id_menu_order'
  },
  idMenu:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field: 'id_menu'
  },
  idOrder:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field: 'id_order'
  }
};

class MenusOrders extends Model{
  static config(sequelize){
    return{
      sequelize,
      tableName:MENUS_ORDERS_TABLE,
      modelName:'MenusOrders',
      timestamps:true
    }
  }
};

module.exports = {MENUS_ORDERS_TABLE, MenusOrdersSchema, MenusOrders}
