const {
    createControllerAdmin,
    updateControllerUser,
    showAllControllerUser,
    showOneByPkControllerUser,
    destroyControllerUser,
} = require('./controller')

const bcrypt = require('bcrypt')
async function createAdminHandler(req,res)
{
    const hashedPassword = await securePassword(req.body.password)
    try{
        const UserData = {
            name:req.body.name ,
            email:req.body.email ,
            password:hashedPassword ,
            role:req.body.role,
            contact:req.body.contact,
            isAdmin:0,
        };
        const response = await createControllerAdmin(UserData);
        res.status(201).json({response:response});
    } catch(error){
        res.status(500).json({error:error.message})
    }
}
const securePassword = async(password)=>{
    try{
        const hashedPassword = await bcrypt.hash(password,10)
        return hashedPassword
    }
    catch(error)
    {
        console.log(error.message)
    }
}
module.exports = {
    createAdminHandler,
    securePassword,
}