const{Model, DataTypes, sequelize}=require('sequelize');

const MENUS_TABLE = `menus`;

const MenusSchema ={
  idMenu:{
    allowNull:false,
    primaryKey:true,
    type: DataTypes.INTEGER,
    autoIncrement:true,
    field: 'id_menu'
  },
  menuName:{
    allowNull:false,
    type:DataTypes.STRING,
    unique:true,
    field: 'menu_name'
  },
  menuDescription:{
    allowNull:false,
    type:DataTypes.STRING,
    field: 'menu_description'
  },
  menuPrice:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field:'menu_price'
  },
  menuObservations:{
    allowNull:true,
    type:DataTypes.STRING,
    field:'menu_observations'
  },
  idCateringCompany:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field:'id_catering_company'
  }
};

class Menus extends Model{
  static associate(models){
    this.belongsToMany(models.Orders,
                      {as:'menusByOrder',
                      through:models.MenusOrders,
                      foreignKey:'idMenu',
                      otherKey:'idOrder'
                      }
    );
    this.belongsToMany(models.Dates,
      {as:'menusByDates',
      through:models.MenusDates,
      foreignKey:'idMenu',
      otherKey:'idDate'
      }
    );
    this.belongsToMany(models.Days,
      {as:'menusDays',
        through:models.MenusDays,
        foreignKey:'idMenu',
        otherKey:'idDay'
      }
    ),
    this.belongsTo(models.CateringCompanies,{as:'menusCateringCompany', foreignKey:'idCateringCompany'})
  };

  static config(sequelize){
    return{
      sequelize,
      tableName:MENUS_TABLE,
      modelName:'Menus',
      timestamps:true
    }
  }
};

module.exports = {MENUS_TABLE, MenusSchema, Menus}
