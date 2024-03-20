const User = require('../../models/userModel')
const bcrypt = require('bcrypt')
const randormstring = require('randomstring')
const config = require('../../config/config')

const jwt = require('jsonwebtoken')

async function showOneControllerUser(UserId) {
  try {
    const response = await User.findOne({_id:UserId});
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching data from User');
  }
}


async function updateControllerUser(UserId, data) {
    try {
      await User.updateOne(UserId, data);
      const response = await User.findOne({_id:UserId})

      return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating User');
    }
  }


  module.exports={
    updateControllerUser,
    showOneControllerUser,
}