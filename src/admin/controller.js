
const User = require('../../models/userModel')

const config = require('../../config/config')

const jwt = require('jsonwebtoken')

async function createControllerAdmin(data){
    try{
      const user = new User(data)
      const response = await user.save()
    return response
    }
    catch(error)
    {
        console.error(error);
      throw new Error('Error creating User') 
      
    }
}
async function showAllControllerAdmin() {
    {
    try {
            const response = await User.find({})
            return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting User');
    }
  }
  }
  async function updateControllerAdmin(UserId, data) {
    try {
      await User.updateOne({ _id: UserId }, { $set: data });
      const response = await User.findOne({_id:UserId})
      console.log("updated")
      return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating User');
    }
  }

  async function destroyControllerAdmin(UserId) {
    try {
      const deleteTerm = await User.findOne({_id:UserId})

      const response = await User.deleteOne({ _id: UserId });
      return deleteTerm;
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting User');
    }
  }
  
  module.exports={
    showAllControllerAdmin,createControllerAdmin,updateControllerAdmin,destroyControllerAdmin
  }