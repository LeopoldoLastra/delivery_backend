const{Model, DataTypes,sequelize}=require('sequelize');


const DATES_TABLE = `dates`;

const DatesSchema ={
  idDate:{
    allowNull:false,
    primaryKey:true,
    type: DataTypes.INTEGER,
    autoIncrement:true,
    field: 'id_date'
  },
  fullDate: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'full_date'
  },
  day: {
    allowNull: false,
    type: DataTypes.SMALLINT,
    field: 'day'
  },
  month: {
    allowNull: false,
    type: DataTypes.SMALLINT,
    field: 'month'
  },
  year: {
    allowNull: false,
    type: DataTypes.SMALLINT,
    field: 'year'
  },
  dayOfWeek: {
    allowNull: false,
    type: DataTypes.SMALLINT,
    field: 'day_of_week'
  },
  weekOfYear: {
    allowNull: false,
    type: DataTypes.SMALLINT,
    field: 'week_of_year'
  },
  isWeekend: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'is_weekend'
  },
  monthName: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'month_name'
  },
  dayName: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'day_name'
  }
};

class Dates extends Model{
  static associate(models){
    this.belongsToMany(models.Menus,
      {as:'menusDate',
      through:models.MenusDates,
      foreignKey:'idDate',
      otherKey:'idMenu'
      }
    );
  };

  static config(sequelize){
    return{
      sequelize,
      tableName:DATES_TABLE,
      modelName:'Dates',
      timestamps:true
    }
  }
};

module.exports = {DATES_TABLE, DatesSchema, Dates}
