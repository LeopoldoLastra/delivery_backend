const boom=require('@hapi/boom')
const {models}=require('../libs/sequelize')

class GuardiansServices{
  async create(data){
    try{
      const newguardian = await models.Guardians.create(data);
      return newguardian;
    }catch(err){
      throw boom.internal('Error creating the guardian',{details: err.message})
    }
  };

  async findBy({id,all,dni}){
    try {
      if (id){
        const searchedGuardian = await models.Guardians.findByPk(id,{include:[{model:models.Customers,as:'guardiansCustomers',
                                                                                    include:[{model:models.Organizations, as:'customerOrganization'}]
                                                                              }]
                                                                      });
        console.log(searchedGuardian.guadiansCustomers)
        if (!searchedGuardian){
          throw boom.notFound('Guardian not found');
        };
        return searchedGuardian;
      } else if (dni){
        const searchedGuardian = await models.Guardians.findOne({where:{guardianDNI:dni},
                                                                  include:[{model:models.Customers,as:'guardiansCustomers',
                                                                                  include:[{model:models.Organizations, as:'customerOrganization'}]
                                                                          }]
                                                                  });
        if (!searchedGuardian){
          throw boom.notFound('Guardian not found');
        };
        return searchedGuardian;
      }else if (all){
        const guardians = await models.Guardians.findAll({include:[{model:models.Customers,as:'guardiansCustomers',
                                                                            include:[{model:models.Organizations, as:'customerOrganization'}]},
                                                                   ]
                                                          });
        if (!guardians && guardians.length > 0) {
          throw boom.notFound('Guardians not found');
        };
        return guardians;
      } else{
        throw boom.badRequest('Invalid query parameters');
      }
    }catch (err){
      if (err.isBoom) {
        throw err;
      }
      throw boom.internal('Error fetching the guardian(s)', { details: err.message });
    };
  };


  async update(id,changes){
    const guardianToUpdate= await models.Guardians.findByPk(id);
      if(!guardianToUpdate){
        throw boom.notFound('Guardian not found')
      };
    try{
      const updatedGuardian= await guardianToUpdate.update(changes);
      return updatedGuardian;
    }catch(err){
      if (err.isBoom){
        throw err;
      };
      throw boom.internal('Guardian update error',{details: err.message})
    };

  };

  async delete(id) {
    const guardianToDelete = await models.Guardians.findByPk(id);
    if (!guardianToDelete) {
      throw boom.notFound('Guardian not found');
    }
    try {
      await guardianToDelete.destroy();
      return guardianToDelete;
    } catch (err){
      if (err.isBoom){
        throw err;
      }
      throw boom.internal('Error deleting the guardian',{details: err.message});
    }
  };
};

module.exports = GuardiansServices;
