const express =require('express');
require('dotenv').config();
const {logError,errorHandler,boomErrorHandler}=require('./middleware/error.handler')

const app = express();
const port = process.env.PORT || 3000;
const routerApi = require('./routes/routes')

app.use(express.json());

app.listen(port,()=>{
  console.log('El puerto es ' + port)
});


routerApi(app);

app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);
