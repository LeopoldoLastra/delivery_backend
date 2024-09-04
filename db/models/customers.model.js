const{Model, DataTypes, sequelize}=require('sequelize');
const {ORGANIZATIONS_TABLE}=require('./organizations.model');
const {GUARDIANS_TABLE}=require('./guardians.model');

const CUSTOMERS_TABLE = `customers`;

const CustomersSchema ={
  idCustomer:{
    allowNull:false,
    primaryKey:true,
    type:DataTypes.INTEGER,
    autoIncrement:true,
    field:'id_customer'
  },
  customerName:{
    allowNull:false,
    type:DataTypes.STRING,
    field:'customer_name'
  },
  customerLastName:{
    allowNull:false,
    type:DataTypes.STRING,
    field:'customer_last_name'
  },
  customerDNI:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field:'customer_DNI'
  },
  idOrganization:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field:'id_organization',
    references: {
      model: ORGANIZATIONS_TABLE,
      key: 'id_organization'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idGuardian:{
    allowNull:true,
    type:DataTypes.INTEGER,
    field:'id_guardian',
    references: {
      model: GUARDIANS_TABLE,
      key: 'id_guardian'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idUser:{
    allowNull:true,
    type:DataTypes.INTEGER,
    field:'id_user',
    unique: true
  }
};

class Customers extends Model{
  static associate(models){
    this.belongsTo(models.Organizations, {as:'customerOrganization', foreignKey:'idOrganization'});
    this.belongsTo(models.Guardians,{as:'customerGuardian', foreignKey:'idGuardian'});
    this.belongsTo(models.Users,{as:'customerUser', foreignKey:'idUser' });
    this.hasOne(models.Orders, {as:'customerOrder', foreignKey:'idCustomer'})
  }
  static config(sequelize){
    return{
      sequelize,
      tableName:CUSTOMERS_TABLE,
      modelName:'Customers',
      timestamps:true
    }
  }
};

module.exports = {CUSTOMERS_TABLE, CustomersSchema, Customers}
