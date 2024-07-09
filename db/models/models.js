const {Menus, MenusSchema} = require('./menus.model');
const {Customers, CustomersSchema}=require('./customers.model');
const {Dates, DatesSchema}=require('./dates.model');
const {Guardians, GuardiansSchema}=require('./guardians.model');
const {MenusDates, MenusDatesSchema}=require('./menus.dates.model');
const {MenusOrders, MenusOrdersSchema}=require('./menus.order.model');
const {Orders, OrdersSchema}=require('./orders.model');
const {Organizations, OrganizationsSchema}=require('./organizations.model');
const {Users, UsersSchema}=require('./users.model');

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

  Menus.associate(sequelize.models);
  Customers.associate(sequelize.models);
 Dates.associate(sequelize.models);
  Guardians.associate(sequelize.models);
  Orders.associate(sequelize.models);
  Organizations.associate(sequelize.models);
  Users.associate(sequelize.models);
};


module.exports=setUpModels;
