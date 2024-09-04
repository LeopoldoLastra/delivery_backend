const{Model, DataTypes, sequelize}=require('sequelize');


const CATERING_COMPANIES_TABLE = `catering_companies`;

const CateringCompaniesSchema ={
  idCateringCompany:{
    allowNull:false,
    primaryKey:true,
    type:DataTypes.INTEGER,
    autoIncrement:true,
    field:'id_catering_company'
  },
  cateringCompanyName:{
    allowNull:false,
    type:DataTypes.STRING,
    field:'catering_company_name'
  },
  cateringCompanyAddress:{
    allowNull:false,
    type:DataTypes.STRING,
    field:'catering_company_address'
  },
  cateringCompanyCUIT:{
    allowNull:false,
    type:DataTypes.STRING,
    field:'catering_company_CUIT'
  },
  idUser:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field:'id_users',
    unique: true,
    references: {
      model: 'users',
      key: 'id_user'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'

  }
};

class CateringCompanies extends Model{
  static associate(models){
    this.hasMany(models.Menus, {as:'cateringCompanyMenus', foreignKey:'idCateringCompany',onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    this.hasMany(models.Orders, {as:'companyOrder',foreignKey:'idCateringCompany',onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    this.belongsTo(models.Users,{as:'cateringCompanyUser', foreignKey:'idUser',onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    this.belongsToMany(models.Organizations,
      {as:'cateringOrganizations',
      through:models.OrganizationsCaterings,
      foreignKey:'idCateringCompany',
      otherKey:'idOrganization'
      }
);
  }
  static config(sequelize){
    return{
      sequelize,
      tableName:CATERING_COMPANIES_TABLE,
      modelName:'CateringCompanies',
      timestamps:true
    }
  }
};

module.exports = {CATERING_COMPANIES_TABLE, CateringCompaniesSchema, CateringCompanies}
