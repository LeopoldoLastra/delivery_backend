const boom=require('@hapi/boom')
const {models}=require('../libs/sequelize')

class OrganizationsLocationsServices{
  async create(data){
    try{
      const newOrganizationLocation = await models.OrganizationsLocations.create(data);
      return newOrganizationLocation;
    }catch(err){
      throw boom.internal('Error creating the organization',{details: err.message})
    }
  };

  async findBy({id, all,organizationId}){
    try {
      if (id){
        const searchedOrganizationLocation = await models.OrganizationsLocations.findByPk(id);
        if (!searchedOrganizationLocation){
          throw boom.notFound('Organization not found');
        };
        return searchedOrganizationLocation;
      } else if (organizationId){
        const searchedOrganizationLocations = await models.Organizations.findOne({where:{idOrganization:organizationId}});
        if (!searchedOrganizationLocations && searchedOrganizationLocations.length > 0) {
          throw boom.notFound('Organizations Locationss not found');
        };
        return searchedOrganizationLocations;
      } else if (all){
        const organizationsLocations = await models.OrganizationsLocations.findAll();
        if (!organizationsLocations && organizationsLocations.length > 0) {
          throw boom.notFound('Organizations Locations not found');
        };
        return organizationsLocations;
      } else{
        throw boom.badRequest('Invalid query parameters');
      }
    }catch (err){
      if (err.isBoom) {
        throw err;
      }
      throw boom.internal('Error fetching the organization(s) Location(s)', { details: err.message });
    };
  };


  async update(id,changes){
    const organizationLocationToUpdate= await models.OrganizationsLocations.findByPk(id);
      if(!organizationLocationToUpdate){
        throw boom.notFound('Organization not found')
      };
    try{
      const updatedOrganizationLocation= await organizationLocationToUpdate.update(changes);
      return updatedOrganizationLocation;
    }catch(err){
      if (err.isBoom){
        throw err;
      };
      throw boom.internal('Organization Location update error',{details: err.message})
    };

  };

  async delete(id) {
    const organizationLocationToDelete = await models.OrganizationsLocations.findByPk(id);
    if (!organizationLocationToDelete) {
      throw boom.notFound('Organization not found');
    }
    try {
      await organizationLocationToDelete.destroy();
      return organizationLocationToDelete;
    } catch (err){
      if (err.isBoom){
        throw err;
      }
      throw boom.internal('Error deleting the organization',{details: err.message});
    }
  };
};

module.exports = OrganizationsLocationsServices
