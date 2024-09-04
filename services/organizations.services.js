const boom=require('@hapi/boom')
const {models}=require('../libs/sequelize')
const sequelize = require('../libs/sequelize')

class OrganizationsServices{
  async create(data){
    const transaction = await sequelize.transaction();
    try{
      const newOrganization = await models.Organizations.create(data);

      const organizationLocations = data.organizationLocation;

      if(organizationLocations && organizationLocations.length>0){
        const allLocations = organizationLocations.map(location=>({
          organizationAddress: location.organizationAddress,
          organizationTel: location.organizationTel,
          idOrganization:newOrganization.idOrganization
        }))
        await models.OrganizationsLocations.bulkCreate(allLocations, { transaction } )
      }

      const activeOrganization = data.cateringOrganizations;

      if(activeOrganization && activeOrganization.length>0){
        const linkedOrganization = activeOrganization.map(organization=>({
          idOrganization: newOrganization.idOrganization,
          idCateringCompany:organization.idCateringCompany
        }))
        await models.OrganizationsCaterings.bulkCreate(linkedOrganization,{transaction})
      }


      await transaction.commit();
      return newOrganization;
    }catch(err){
      await transaction.rollback();
      throw boom.internal('Error creating the organization',{details: err.message})
    }
  };

  async findBy({id, all}){
    try {
      if (id){
        const searchedOrganization = await models.Organizations.findByPk(id, {include:[{model:models.OrganizationsTypes,as:'organizationType'},
                                                                                      {model:models.OrganizationsLocations,as:'organizationLocation'}
                                                                                      ]});
        if (!searchedOrganization){
          throw boom.notFound('Organization not found');
        };
        return searchedOrganization;
      } else if (all){
        const organizations = await models.Organizations.findAll({include:[{model:models.OrganizationsTypes,as:'organizationType'},
          {model:models.OrganizationsLocations,as:'organizationLocation'}
          ]});
        if (!organizations && organizations.length > 0) {
          throw boom.notFound('Organizations not found');
        };
        return organizations;
      }else{
        throw boom.badRequest('Invalid query parameters');
      }
    }catch (err){
      if (err.isBoom) {
        throw err;
      }
      throw boom.internal('Error fetching the organization(s)', { details: err.message });
    };
  };


  async update(id,changes){
    const organizationToUpdate= await models.Organizations.findByPk(id);
      if(!organizationToUpdate){
        throw boom.notFound('Organization not found')
      };
    try{
      const updatedOrganization= await organizationToUpdate.update(changes);
      return updatedOrganization;
    }catch(err){
      if (err.isBoom){
        throw err;
      };
      throw boom.internal('Organization update error',{details: err.message})
    };

  };

  async delete(id) {
    const organizationToDelete = await models.Organizations.findByPk(id);
    if (!organizationToDelete) {
      throw boom.notFound('Organization not found');
    }
    try {
      await organizationToDelete.destroy();
      return organizationToDelete;
    } catch (err){
      if (err.isBoom){
        throw err;
      }
      throw boom.internal('Error deleting the organization',{details: err.message});
    }
  };
};

module.exports = OrganizationsServices
