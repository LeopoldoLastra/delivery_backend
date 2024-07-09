const express=require('express');
const menusRouter=require('./menus.router');
const organizationsRouter=require('./organizations.router');
const customersRouter=require('./customers.router');
const guardiansRouter=require('./guardians.router');
const ordersRouter=require('./orders.routers');
const datesRouter=require('./dates.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router)
    router.use('/menus', menusRouter );
    router.use('/organizations', organizationsRouter);
    router.use('/customers',customersRouter);
    router.use('/guardians',guardiansRouter);
    router.use('/orders',ordersRouter);
    router.use('/dates',datesRouter);
};

module.exports=routerApi;
