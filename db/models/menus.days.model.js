const{Model, DataTypes, sequelize}=require('sequelize');

const MENUS_DAYS_TABLE = `menus_days`;

const MenusDaysSchema ={
  idMenuDay:{
    allowNull:false,
    primaryKey:true,
    type: DataTypes.INTEGER,
    autoIncrement:true,
    field: 'id_menu_day'
  },
  idMenu:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field: 'id_menu'
  },
  idDay:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field: 'id_day'
  },
  enabled:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field: 'enabled',
    defaultValue:'1'
  },
};

class MenusDays extends Model{
  static config(sequelize){
    return{
      sequelize,
      tableName:MENUS_DAYS_TABLE,
      modelName:'MenusDays',
      timestamps:true
    }
  }
};

module.exports = {MENUS_DAYS_TABLE, MenusDaysSchema, MenusDays}
