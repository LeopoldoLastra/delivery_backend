const{Model, DataTypes, sequelize}=require('sequelize');

const ORGANIZATIONS_TABLE = `organizations`;

const OrganizationsSchema ={
  idOrganization:{
    allowNull:false,
    primaryKey:true,
    type: DataTypes.INTEGER,
    autoIncrement:true,
    field: 'id_organization',
  },
  organizationName:{
    allowNull:false,
    type:DataTypes.STRING,
    field: 'organization_name'
  },
  organizationAddress:{
    allowNull:false,
    type:DataTypes.STRING,
    field: 'organization_address'
  }
};

class Organizations extends Model{
  static associate(models){
    this.hasMany(models.Customers,{as:'organizationCustomers', foreignKey:'idOrganization'})
  };
  static config(sequelize){
    return{
      sequelize,
      tableName:ORGANIZATIONS_TABLE,
      modelName:'Organizations',
      timestamps:true,
      uniqueKeys: {
        organizations_id_organization_unique: {
          fields: ['id_organization']
        }
      }
    }
  };
};

module.exports = {ORGANIZATIONS_TABLE, OrganizationsSchema, Organizations}
