const{Model, DataTypes, sequelize}=require('sequelize');
const {ORGANIZATIONS_TYPES_TABLE}=require('./organizations.types.model')

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
  organizationContactName:{
    allowNull:false,
    type:DataTypes.STRING,
    field: 'organization_contact_name'
  },
  organizationContactTel:{
    allowNull:false,
    type:DataTypes.STRING,
    field: 'organization_contact_tel'
  },
  idOrganizationType:{
    allowNull:false,
    type: DataTypes.INTEGER,
    field: 'id_organization_type',
    references: {
      model: ORGANIZATIONS_TYPES_TABLE,
      key: 'id_organization_type'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
  }


class Organizations extends Model{
  static associate(models){
    this.hasMany(models.Customers,{as:'organizationCustomers', foreignKey:'idOrganization'});
    this.belongsToMany(models.CateringCompanies, {as:'cateringOrganizations',
      through:models.OrganizationsCaterings,
      foreignKey:'idOrganization',
      otherKey:'idCateringCompany'
      });
    this.belongsTo(models.OrganizationsTypes, {as:'organizationType', foreignKey:'id_organization_type'});
    this.hasMany(models.OrganizationsLocations,{as:'organizationLocation', foreignKey:'idOrganization'});

  }

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
