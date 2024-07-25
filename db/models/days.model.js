const{Model, DataTypes,sequelize}=require('sequelize');

const DAYS_TABLE = `days`;

const DaysSchema ={
  idDay:{
    allowNull:false,
    primaryKey:true,
    type: DataTypes.INTEGER,
    autoIncrement:true,
    field: 'id_day'
  },
  dayName: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'day_name'
  }
};

class Days extends Model{
  static associate(models){
    this.belongsToMany(models.Menus,
      {as:'daysEnabledByMenu',
      through:models.MenusDays,
      foreignKey:'idDay',
      otherKey:'idMenu'
      }
    );
  };

  static config(sequelize){
    return{
      sequelize,
      tableName:DAYS_TABLE,
      modelName:'Days',
      timestamps:true
    }
  }
};

module.exports = {DAYS_TABLE, DaysSchema, Days}
