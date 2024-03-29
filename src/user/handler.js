const {showOneControllerUser,updateControllerUser} = require('./controller')
 

async function updateUserHandler(req,res)
{
    try{
        const { id } = req.body;
        const UserData = {
            password:req.body.password ,
           
        };
        const response = await updateControllerUser(id, UserData);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function showOneUserHandler(req,res)
{
    try{
        const { userId } = req.body;
        const response = await showOneControllerUser(userId);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports={
    showOneUserHandler,
    updateUserHandler
}