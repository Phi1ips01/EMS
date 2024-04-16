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
        if (response.success) {
            const rp = { message: 'Login successful', user:response.user,token:response.token,payload:response.payload }
            console.log("resposne",rp)
            
            res.status(200).json(rp);

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