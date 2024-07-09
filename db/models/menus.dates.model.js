const{Model, DataTypes, sequelize}=require('sequelize');

const MENUS_DATES_TABLE = `menus_dates`;

const MenusDatesSchema ={
  idMenuDate:{
    allowNull:false,
    primaryKey:true,
    type: DataTypes.INTEGER,
    autoIncrement:true,
    field: 'id_menu_date'
  },
  idMenu:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field: 'id_menu'
  },
  idDate:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field: 'id_date'
  }
};

class MenusDates extends Model{
  static config(sequelize){
    return{
      sequelize,
      tableName:MENUS_DATES_TABLE,
      modelName:'MenusDates',
      timestamps:true
    }
  }
};

module.exports = {MENUS_DATES_TABLE, MenusDatesSchema, MenusDates}
