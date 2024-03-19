const {
    loginControllerUser
} = require('./controller')


async function loginUserHandler(req, res) {
    try {
        const userData = {
            email: req.body.email,
            password: req.body.password,
        };
        
        const response = await loginControllerUser(userData);
        console.log("resposne",response)
        if (response.success) {
            res.status(200).json({ message: 'Login successful', user: response.user,token:response.token,payload:response.payload });
        } else {
            res.status(401).json({ error: response.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message});
    }
}
module.exports={
    loginUserHandler
}