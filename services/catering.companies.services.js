const boom=require('@hapi/boom');
const {models}=require('../libs/sequelize');
const sequelizae = require('../libs/sequelize')

class CateringCompaniesServices{
  async create(data){
    const transaction = await sequelizae.transaction();
    try{
      const newCateringCompany = await models.CateringCompanies.create(data, {transaction});
      const activeOrganization = data.cateringOrganizations;

      if(activeOrganization && activeOrganization.length>0){
        const linkedOrganization = activeOrganization.map(organization=>({
          idOrganization: organization.idOrganization,
          idCateringCompany:newCateringCompany.idCateringCompany
        }))
        await models.OrganizationsCaterings.bulkCreate(linkedOrganization,{transaction})
      }
      await transaction.commit();

      return newCateringCompany;
    }catch(err){
      await transaction.rollback();
      throw boom.internal('Error creating the Catering Company',{details: err.message})
    }
  };

  async findBy({id,all,name,userId}){
    try {
      if (id){
        const searchedCateringCompany = await models.CateringCompanies.findByPk(id,{include:[{model:models.Organizations,as:'cateringOrganizations'},
                                                                              {model:models.Menus,as:'cateringCompanyMenus'}
                                                                            ]});
        if (!searchedCateringCompany ){
          throw boom.notFound('Catering Company not found');
        };
        return searchedCateringCompany ;
      } else if (userId){
        const searchedCateringCompany  = await models.CateringCompanies.findOne({where:{idUser:userId},
                                                                  include:[{model:models.Organizations,as:'cateringOrganizations'},
                                                                           {model:models.Menus,as:'cateringCompanyMenus'}
                                                                        ]});
        if (!searchedCateringCompany ){
          throw boom.notFound('Catering Company not found');
        };
        return searchedCateringCompany ;
      }else if (name){
        const searchedCateringCompany  = await models.CateringCompanies.findOne({where:{cateringName:name},
                                                                  include:[{model:models.Organizations,as:'cateringOrganizations'},
                                                                           {model:models.Menus,as:'cateringCompanyMenus'}
                                                                        ]});
        if (!searchedCateringCompany){
          throw boom.notFound('Catering Company not found');
        };
        return searchedCateringCompany;
      }else if (all){
        const cateringCompanies = await models.CateringCompanies.findAll({include:[{model:models.Organizations,as:'cateringOrganizations'},
                                                                   {model:models.Menus,as:'cateringCompanyMenus'}
                                                                  ]});
        if (!cateringCompanies && cateringCompanies.length > 0) {
          throw boom.notFound('catering Companies not found');
        };
        return cateringCompanies;
      } else{
        throw boom.badRequest('Invalid query parameters');
      }
    }catch (err){
      if (err.isBoom) {
        throw err;
      }
      throw boom.internal('Error fetching the catering(s)', { details: err.message });
    };
  };


  async update(id,changes){
    const cateringCompayToUpdate= await models.CateringCompanies.findByPk(id);
      if(!cateringCompayToUpdate){
        throw boom.notFound('Catering Company not found')
      };
    try{
      const updatedCateringCompany= await cateringCompayToUpdate.update(changes);
      return updatedCateringCompany;
    }catch(err){
      if (err.isBoom){
        throw err;
      };
      throw boom.internal('Catering update error',{details: err.message})
    };

  };

  async delete(id) {
    const cateringCompanyToDelete = await models.CateringCompanies.findByPk(id);
    if (!cateringCompanyToDelete) {
      throw boom.notFound('Catering not found');
    }
    try {
      await cateringCompanyToDelete.destroy();
      return cateringCompanyToDelete;
    } catch (err){
      if (err.isBoom){
        throw err;
      }
      throw boom.internal('Error deleting the catering',{details: err.message});
    }
  };
};

module.exports = CateringCompaniesServices;
