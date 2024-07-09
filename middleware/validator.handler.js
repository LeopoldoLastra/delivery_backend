const boom=require('@hapi/boom')

function validatorHandler(schema,property){
  return(req,res,next)=>{
    const data=req[property];
    const {error}=schema.validate(data,{abortEarly:false})

    if(error){
      if(error.isJoi){
        const { details } = error;
        const errorMessage = details.map(detail => detail.message).join(', ');
        next(boom.badRequest('Validation Error', { details: errorMessage }));
      } else{
        next(boom.badImplementation('Internal Server Error', error));
      };
    }else{
      next();
    }
  }

};

module.exports=validatorHandler;
