const boom=require('@hapi/boom')
const {models}=require('../libs/sequelize')

class UsersServices{
  async create(data){
    try{
      const newUser = await models.Users.create(data);
      const newUserName = newUser.userName
      return newUserName;
    }catch(err){
      throw boom.internal('Error creating the organization',{details: err.message})
    }
  };

  async findBy({id, all, user}){
    try {
      if (id){
        const searchedUser = await models.Users.findByPk(id);
        if (!searchedUser){
          throw boom.notFound('Organization not found');
        };
        const searchedUserData = {
          userName:searchedUser.userName,
          userType:searchedUser.userType,
          active: searchedUser.active
        }
        return searchedUserData;
      } else if (user){
        const searchedUser = await models.Users.findOne({where:{userName:user}});

        if (!searchedUser) {throw boom.notFound('User not found');};

        return searchedUser;

      } else if (all){
        const users = await models.Users.findAll();
        if (!users) {
          throw boom.notFound('Organizations not found');
        };

        const allUsersData = users.map(user=>{
          return {
            userName: user.userName,
            userType: user.userType,
            active: user.active,
          };

        })

        return allUsersData;
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
    const userToUpdate= await models.Ysers.findByPk(id);
      if(!userToUpdate){
        throw boom.notFound('User not found')
      };
    try{
      const updatedUser= await userToUpdate.update(changes);
      return updatedUser;
    }catch(err){
      if (err.isBoom){
        throw err;
      };
      throw boom.internal('User update error',{details: err.message})
    };

  };

  async delete(id) {
    const userToDelete = await models.Users.findByPk(id);
    if (!userToDelete) {
      throw boom.notFound('User not found');
    }
    try {
      await userToDelete.destroy();
      return userToDelete;
    } catch (err){
      if (err.isBoom){
        throw err;
      }
      throw boom.internal('Error deleting the user',{details: err.message});
    }
  };
};

module.exports = UsersServices
