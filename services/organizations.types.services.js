const boom=require('@hapi/boom')
const {models}=require('../libs/sequelize')

class OrganizationsTypesServices{
  async create(data){
    try{
      const newOrganizationType = await models.OrganizationsTypes.create(data);
      return newOrganizationType;
    }catch(err){
      throw boom.internal('Error creating the organization',{details: err.message})
    }
  };

  async findBy({id, all}){
    try {
      if (id){
        const searchedOrganizationType = await models.OrganizationsTypes.findByPk(id);
        if (!searchedOrganizationType){
          throw boom.notFound('Organization not found');
        };
        return searchedOrganizationType;
      } else if (all){
        const organizationsTypes = await models.OrganizationsTypes.findAll();
        if (!organizationsTypes && organizationsTypes.length > 0) {
          throw boom.notFound('Organizations types not found');
        };
        return organizationsTypes;
      } else{
        throw boom.badRequest('Invalid query parameters');
      }
    }catch (err){
      if (err.isBoom) {
        throw err;
      }
      throw boom.internal('Error fetching the organization(s) type(s)', { details: err.message });
    };
  };


  async update(id,changes){
    const organizationTypeToUpdate= await models.OrganizationsTypes.findByPk(id);
      if(!organizationTypeToUpdate){
        throw boom.notFound('Organization not found')
      };
    try{
      const updatedOrganizationType= await organizationTypeToUpdate.update(changes);
      return updatedOrganizationType;
    }catch(err){
      if (err.isBoom){
        throw err;
      };
      throw boom.internal('Organization type update error',{details: err.message})
    };

  };

  async delete(id) {
    const organizationTypeToDelete = await models.OrganizationsTypes.findByPk(id);
    if (!organizationTypeToDelete) {
      throw boom.notFound('Organization not found');
    }
    try {
      await organizationTypeToDelete.destroy();
      return organizationTypeToDelete;
    } catch (err){
      if (err.isBoom){
        throw err;
      }
      throw boom.internal('Error deleting the organization',{details: err.message});
    }
  };
};

module.exports = OrganizationsTypesServices
