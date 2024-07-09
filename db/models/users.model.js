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
    field: 'user_name'
  },
  password:{
    allowNull:false,
    type:DataTypes.STRING,
    field: 'password'
  }
};

class Users extends Model{
  static associate(models){
    this.hasOne(models.Customers, {as:'userCustomer'});
    this.hasOne(models.Guardians, {as:'userGuardian'});
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
