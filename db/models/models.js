const {Menus, MenusSchema} = require('./menus.model');
const {Customers, CustomersSchema}=require('./customers.model');
const {Dates, DatesSchema}=require('./dates.model');
const {Guardians, GuardiansSchema}=require('./guardians.model');
const {MenusDates, MenusDatesSchema}=require('./menus.dates.model');
const {MenusOrders, MenusOrdersSchema}=require('./menus.order.model');
const {Orders, OrdersSchema}=require('./orders.model');
const {Organizations, OrganizationsSchema}=require('./organizations.model');
const {Users, UsersSchema}=require('./users.model');
const {Days, DaysSchema}=require('./days.model');
const {MenusDays, MenusDaysSchema}=require('./menus.days.model');
const {CateringCompanies, CateringCompaniesSchema}=require('./catering.companies.model');
const {OrganizationsCaterings, OrganizationsCateringsSchema}=require('./organizations.caterings.model');
const {OrganizationsTypes, OrganizationsTypesSchema}=require('./organizations.types.model');
const {OrganizationsLocations, OrganizationsLocationsSchema}=require('./organizations.locations.model');

function setUpModels(sequelize){
  Menus.init(MenusSchema, Menus.config(sequelize));
  Customers.init(CustomersSchema, Customers.config(sequelize));
  Dates.init(DatesSchema, Dates.config(sequelize));
  Guardians.init(GuardiansSchema, Guardians.config(sequelize));
  MenusDates.init(MenusDatesSchema, MenusDates.config(sequelize));
  MenusOrders.init(MenusOrdersSchema, MenusOrders.config(sequelize));
  Orders.init(OrdersSchema, Orders.config(sequelize));
  Organizations.init(OrganizationsSchema, Organizations.config(sequelize));
  Users.init(UsersSchema, Users.config(sequelize));
  Days.init(DaysSchema, Days.config(sequelize));
  MenusDays.init(MenusDaysSchema, MenusDays.config(sequelize));
  CateringCompanies.init(CateringCompaniesSchema, CateringCompanies.config(sequelize));
  OrganizationsCaterings.init(OrganizationsCateringsSchema, OrganizationsCaterings.config(sequelize));
  OrganizationsTypes.init(OrganizationsTypesSchema, OrganizationsTypes.config(sequelize));
  OrganizationsLocations.init(OrganizationsLocationsSchema, OrganizationsLocations.config(sequelize));


  Menus.associate(sequelize.models);
  Customers.associate(sequelize.models);
  Dates.associate(sequelize.models);
  Guardians.associate(sequelize.models);
  Orders.associate(sequelize.models);
  Organizations.associate(sequelize.models);
  Users.associate(sequelize.models);
  Days.associate(sequelize.models);
  CateringCompanies.associate(sequelize.models);
  OrganizationsTypes.associate(sequelize.models);
  OrganizationsLocations.associate(sequelize.models);
};


module.exports=setUpModels;
