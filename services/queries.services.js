const boom=require('@hapi/boom')
const {models}=require('../libs/sequelize')

class QueriesServices{


  async findBy({organizationId, month}){
    try {
      if (organizationId && month){
        const numberOfMenusPerOrganization = await models.Users.findByPk(id);
        if (!numberOfMenusPerOrganization){
          throw boom.notFound('Query error');
        };

        return searchedUserData;
      }
    }catch (err){
      if (err.isBoom) {
        throw err;
      }
      throw boom.internal('Error fetching the organization(s)', { details: err.message });
    };
  };

}

module.exports = QueriesServices
