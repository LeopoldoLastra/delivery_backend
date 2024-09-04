const{Model, DataTypes, sequelize}=require('sequelize');
const {CUSTOMERS_TABLE}=require('./customers.model')

const ORDERS_TABLE = `orders`;

const OrdersSchema ={
  idOrder:{
    allowNull:false,
    primaryKey:true,
    type: DataTypes.INTEGER,
    autoIncrement:true,
    field: 'id_order'
  },
  idCustomer:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field: 'id_customer',
    references: {
      model: CUSTOMERS_TABLE,
      key: 'id_customer'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idCateringCompany:{
    allowNull:false,
    type: DataTypes.INTEGER,
    field:'id_catering_company'
  },
  month:{
    allowNull:false,
    type: DataTypes.ENUM('enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'),
    field:'month',
  },
  year:{
    allowNull:false,
    type: DataTypes.INTEGER,
    field:'year',
  }
  ,
  paid:{
    allowNull:false,
    type: DataTypes.INTEGER,
    field:'paid',
    defaultValue:'0'
  },
  delivered:{
    allowNull:false,
    type: DataTypes.INTEGER,
    field:'delivered',
    defaultValue:'0'
  }
};

class Orders extends Model{
  static associate(models){
    this.belongsToMany(models.Menus,
                      {as:'orderedMenus',
                      through:models.MenusOrders,
                      foreignKey:'idOrder',
                      otherKey:'idMenu'
                      }
    );
    this.belongsTo(models.Customers, {as:'orderbyCustomer', foreignKey:'idCustomer'});
    this.belongsTo(models.CateringCompanies, {as:'orderCompany', foreignKey:'idCateringCompany'});
  };

  static config(sequelize){
    return{
      sequelize,
      tableName:ORDERS_TABLE,
      modelName:'Orders',
      timestamps:true
    }
  }
};

module.exports = {ORDERS_TABLE, OrdersSchema, Orders}
