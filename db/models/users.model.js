const { allow } = require('joi');
const{Model, DataTypes, sequelize}=require('sequelize');

const USERS_TABLE = `users`;

const UsersSchema ={
  idUser:{
    allowNull:false,
    primaryKey:true,
    type: DataTypes.INTEGER,
    autoIncrement:true,
    field: 'id_user'
  },
  userName:{
    allowNull:false,
    type:DataTypes.STRING,
    unique:true,
    field: 'user_name'
  },
  password:{
    allowNull:false,
    type:DataTypes.STRING,
    field: 'password'
  },
  active:{
    allowNull:false,
    type: DataTypes.INTEGER,
    field:'active',
    defaultValue:'1'
  },
  userType:{
    allowNull:false,
    type: DataTypes.ENUM('comensal', 'tutor', 'organizacion', 'catering'),
    field:'user_type'
  }
};

class Users extends Model{
  static associate(models){
    this.hasOne(models.Customers, {as:'userCustomer', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    this.hasOne(models.Guardians, {as:'userGuardian', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    this.hasOne(models.CateringCompanies, {as:'userCateringCompany', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
  };

  static config(sequelize){
    return{
      sequelize,
      tableName:USERS_TABLE,
      modelName:'Users',
      timestamps:true
    }
  };
};

module.exports = {USERS_TABLE, UsersSchema, Users}
