const{Model, DataTypes, sequelize}=require('sequelize');

const ORGANIZATIONS_LOCATIONS_TABLE = `organizations_locations_types`;

const OrganizationsLocationsSchema ={
  idOrganizationLocation:{
    allowNull:false,
    primaryKey:true,
    type: DataTypes.INTEGER,
    autoIncrement:true,
    field: 'id_organization_location',
  },
  organizationAddress:{
    allowNull:false,
    type:DataTypes.STRING,
    field: 'organization_addres'
  },
  organizationTel:{
    allowNull:false,
    type:DataTypes.STRING,
    field: 'organization_tel'
  },
  idOrganization:{
    allowNull:false,
    type: DataTypes.INTEGER,
    field: 'id_organization',
  }

};

class OrganizationsLocations extends Model{
  static associate(models){
    this.belongsTo(models.Organizations,{as:'organizationLocation', foreignKey:'idOrganization'});
  };

  static config(sequelize){
    return{
      sequelize,
      tableName:ORGANIZATIONS_LOCATIONS_TABLE,
      modelName:'OrganizationsLocations',
      timestamps:true
    }
  };
};

module.exports = {ORGANIZATIONS_LOCATIONS_TABLE, OrganizationsLocationsSchema, OrganizationsLocations}
