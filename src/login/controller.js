const User = require('../../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const loginControllerUser = async (user)=>{
    try{
        let admin=false
        const userData = await User.findOne({email:user.email})
        console.log("verify login 0",userData)
        if(!!userData)
        {
            const passwordCompare = await bcrypt.compare(user.password,userData.password)
            console.log("passwordCOmpare",passwordCompare)
            if(!!passwordCompare)
            {
                if(!!userData.isAdmin)
                {
                    admin=true
                }
                const payload = {
                    email: user.email,
                    id: userData._id,
                    isAdmin: userData.isAdmin
                };
                console.log("login successful")
                const token = jwt.sign(payload, config.secretKey, { expiresIn: "1d" });
                return {
                    success: true,
                    user:userData.name,
                    message: "Login successful",
                    token: "Bearer " + token,
                    payload:payload
                };
            }
            else
            {
                console.log("incorrect password or email")
                return {
                    success:false,
                    message:"incorrect password or email",
                }
            }
        }
        else
        {
            console.log("no email found")
            return {
                success:false,
                message:"incorrect password or email",
            }
        }
    }

    catch(error)
    {
        return {
            success:false,
            message:error.message
        }
        
    }
}

module.exports={
    loginControllerUser
}