const {
    createControllerAdmin,
    updateControllerAdmin,
    showAllControllerAdmin,
    destroyControllerAdmin,
    showOneControllerAdmin,
} = require('./controller')

const bcrypt = require('bcrypt')
async function createAdminHandler(req,res)
{
    const hashedPassword = await securePassword(req.body.password)
    let isAdmin=0
    if(req.body.role === "HR")
    {
        isAdmin=1
    }
    try{
        const UserData = {
            name:req.body.name ,
            email:req.body.email ,
            password:hashedPassword ,
            role:req.body.role,
            contact:req.body.contact,
            isAdmin,
        };
        const response = await createControllerAdmin(UserData);
        console.log("response",response)
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
const showAllAdminHandler = async (req,res)=>{
    try{
        console.log("showalladminhandler")
        const response = await showAllControllerAdmin()
        res.status(201).json({response:response});
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

const deleteOneAdminHandler = async (req,res)=>{
    try{
        console.log(req.body)
        const response = await destroyControllerAdmin(req.body.userId)
        console.log("deleted ",response)
        res.status(201).json({response:response});
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}
async function updateAdminHandler(req, res) {
    let hashedPassword;
    if (!!req.body.password) {
        hashedPassword = await securePassword(req.body.password);
    }

    let isAdmin = undefined; 
    if (!!req.body.role && req.body.role === "HR") {
        isAdmin = 1;
    }

    try {
        const id = req.body._id; 
        const UserData = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
            contact: req.body.contact,
            isAdmin, 
        };

        // Filter out empty or undefined values from UserData
        Object.keys(UserData).forEach(key => {
            if (UserData[key] === undefined || UserData[key] === '') {
                delete UserData[key];
            }
        });

        const response = await updateControllerAdmin(id, UserData);
        console.log("userdata", response);

        res.status(200).json({ response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function showOneAdminHandler(req,res)
{
    try{
        const { userId } = req.query;
        console.log("hi",userId)
        const response = await showOneControllerAdmin(userId);
        console.log("Response,",response)
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    createAdminHandler,
    securePassword,
    showAllAdminHandler,
    deleteOneAdminHandler,
    updateAdminHandler,
    showOneAdminHandler
}