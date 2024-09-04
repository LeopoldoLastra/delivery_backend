const{Model, DataTypes, sequelize}=require('sequelize');

const ORGANIZATIONS_CATERINGS_TABLE = `organizations_caterings`;

const OrganizationsCateringsSchema ={
  idOrganizationCatering:{
    allowNull:false,
    primaryKey:true,
    type: DataTypes.INTEGER,
    autoIncrement:true,
    field: 'id_organization_catering'
  },
  idOrganization:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field: 'id_organization'
  },
  idCateringCompany:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field: 'id_catering_company'
  }
};

class OrganizationsCaterings extends Model{
  static config(sequelize){
    return{
      sequelize,
      tableName:ORGANIZATIONS_CATERINGS_TABLE,
      modelName:'OrganizationsCaterings',
      timestamps:true
    }
  }
};

module.exports = {ORGANIZATIONS_CATERINGS_TABLE, OrganizationsCateringsSchema, OrganizationsCaterings}
