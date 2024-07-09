const{Model, DataTypes, sequelize}=require('sequelize');

const GUARDIANS_TABLE = `guardians`;

const GuardiansSchema ={
  idGuardian:{
    allowNull:false,
    primaryKey:true,
    type:DataTypes.INTEGER,
    autoIncrement:true,
    field:'id_guardian'
  },
  guardianName:{
    allowNull:false,
    type:DataTypes.STRING,
    field:'guardian_name'
  },
  guardianLastName:{
    allowNull:false,
    type:DataTypes.STRING,
    field:'guardian_last_name'
  },
  guardianDNI:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field:'guardian_DNI'
  },
  idUser:{
    allowNull:true,
    type:DataTypes.INTEGER,
    field:'id_user'
  }
};

class Guardians extends Model{
  static associate(models){
    this.hasMany(models.Customers, {as:'guardiansCustomers',  foreignKey: 'idGuardian'});
    this.belongsTo(models.Users, {as:'guardianUser',  foreignKey: 'idUser'});
  };

  static config(sequelize){
    return{
      sequelize,
      tableName:GUARDIANS_TABLE,
      modelName:'Guardians',
      timestamps:true
    }
  };
};

module.exports = {GUARDIANS_TABLE, GuardiansSchema, Guardians}
