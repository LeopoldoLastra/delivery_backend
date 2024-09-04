const{Model, DataTypes, sequelize}=require('sequelize');

const ORGANIZATIONS_TYPES_TABLE = `organizations_types`;

const OrganizationsTypesSchema ={
  idOrganizationType:{
    allowNull:false,
    primaryKey:true,
    type: DataTypes.INTEGER,
    autoIncrement:true,
    field: 'id_organization_type',
  },
  organizationTypeName:{
    allowNull:false,
    type:DataTypes.STRING,
    field: 'organization_type_name'
  }
};

class OrganizationsTypes extends Model{
  static associate(models){
    this.hasOne(models.Organizations,{as:'typeOrganization', foreignKey:'idOrganizationType'});
  };

  static config(sequelize){
    return{
      sequelize,
      tableName:ORGANIZATIONS_TYPES_TABLE,
      modelName:'OrganizationsTypes',
      timestamps:true
    }
  };
};

module.exports = {ORGANIZATIONS_TYPES_TABLE, OrganizationsTypesSchema, OrganizationsTypes}
