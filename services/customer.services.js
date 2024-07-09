const boom=require('@hapi/boom')
const {models}=require('../libs/sequelize')

class CustomersServices{
  async create(data){
    try{
      const newCustomer = await models.Customers.create(data);
      return newCustomer;
    }catch(err){
      throw boom.internal('Error creating the customer',{details: err.message})
    }
  };

  async findBy({id,all,dni}){
    try {
      if (id){
        const searchedCustomer = await models.Customers.findByPk(id,{include:[{model:models.Organizations,as:'customerOrganization'},
                                                                              {model:models.Guardians,as:'customerGuardian'}
                                                                            ]});
        if (!searchedCustomer){
          throw boom.notFound('Customer not found');
        };
        return searchedCustomer;
      } else if (dni){
        const searchedCustomer = await models.Customers.findOne({where:{customerDNI:dni},
                                                                  include:[{model:models.Organizations,as:'customerOrganization'},
                                                                          {model:models.Guardians,as:'customerGuardian'}]});
        if (!searchedCustomer){
          throw boom.notFound('Customer not found');
        };
        return searchedCustomer;
      }else if (all){
        const customers = await models.Customers.findAll({include:[{model:models.Organizations,as:'customerOrganization'},
                                                                   {model:models.Guardians,as:'customerGuardian'}]});
        if (!customers && customers.length > 0) {
          throw boom.notFound('Customer not found');
        };
        return customers;
      } else{
        throw boom.badRequest('Invalid query parameters');
      }
    }catch (err){
      if (err.isBoom) {
        throw err;
      }
      throw boom.internal('Error fetching the customer(s)', { details: err.message });
    };
  };


  async update(id,changes){
    const customerToUpdate= await models.Customers.findByPk(id);
      if(!customerToUpdate){
        throw boom.notFound('Customer not found')
      };
    try{
      const updatedCustomer= await customerToUpdate.update(changes);
      return updatedCustomer;
    }catch(err){
      if (err.isBoom){
        throw err;
      };
      throw boom.internal('Customer update error',{details: err.message})
    };

  };

  async delete(id) {
    const customerToDelete = await models.Customers.findByPk(id);
    if (!customerToDelete) {
      throw boom.notFound('Customer not found');
    }
    try {
      await customerToDelete.destroy();
      return customerToDelete;
    } catch (err){
      if (err.isBoom){
        throw err;
      }
      throw boom.internal('Error deleting the customer',{details: err.message});
    }
  };
};

module.exports = CustomersServices;
