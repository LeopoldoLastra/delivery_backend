const express=require('express');
const menusRouter=require('./menus.router');
const organizationsRouter=require('./organizations.router');
const customersRouter=require('./customers.router');
const guardiansRouter=require('./guardians.router');
const ordersRouter=require('./orders.routers');
const datesRouter=require('./dates.router');
const daysRouter=require('./days.router');
const usersRouter = require('./users.router');
const cateringCompaniesRouter = require('./catering.companies.router');
const organizationsLocationsRouter = require('./organizations.locations.router');
const organizationsTypesRouter = require('./organization.type.router');
const queriesRouter = require('./queries.router');
const querisCateringCompanyUsers =require('./queries.company.users.router');
const queriesCateringCompaniesMenus = require('./queries.menus.days.companies')

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router)
    router.use('/menus', menusRouter );
    router.use('/organizations', organizationsRouter);
    router.use('/customers',customersRouter);
    router.use('/guardians',guardiansRouter);
    router.use('/orders',ordersRouter);
    router.use('/dates',datesRouter);
    router.use('/menus-by-day', daysRouter);
    router.use('/users', usersRouter);
    router.use('/caterings-companies', cateringCompaniesRouter);
    router.use('/organizations-locations', organizationsLocationsRouter);
    router.use('/organizations-types', organizationsTypesRouter);
    router.use('/queries', queriesRouter),
    router.use('/queries-catering-company-users', querisCateringCompanyUsers);
    router.use('/queries-catering-company-menus',queriesCateringCompaniesMenus)
};

module.exports=routerApi;
