const boom=require('@hapi/boom')
const {models}=require('../libs/sequelize')

class OrganizationsServices{
  async create(data){
    try{
      const newOrganization = await models.Organizations.create(data);
      return newOrganization;
    }catch(err){
      throw boom.internal('Error creating the organization',{details: err.message})
    }
  };

  async findBy({id, all}){
    try {
      if (id){
        const searchedOrganization = await models.Organizations.findByPk(id);
        if (!searchedOrganization){
          throw boom.notFound('Organization not found');
        };
        return searchedOrganization;
      } else if (all){
        const organizations = await models.Organizations.findAll();
        if (!organizations && organizations.length > 0) {
          throw boom.notFound('Organizations not found');
        };
        return organizations;
      } else{
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
