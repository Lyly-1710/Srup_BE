import authService from "./auth.service";
import 'dotenv/config';
const jwt = require('jsonwebtoken')

class AuthController{
    async login(req, res, next)
    { 
        try{
            const {username, password} = req.body;
            const user = await authService.login(username, password);
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '30s',
              });
              res.json({ accessToken });
        }catch(error){
                console.log(error)
                return res.status(500).json({
                    success: false,
                    message: "Error"
                });
        }
    }
}

export default new AuthController();