import authService from "./auth.service";
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import usersModel from "../../models/users.model";

class AuthController{
    async login(req, res, next)
    { 
        try{
            const {username, password} = req.body;
            const user = await authService.login(username, password);
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '30m',
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

    async register(req, res, next)
    {
        try {
            const newUser =
                {
                    name: req.body.name,
                    email: req.body.email, 
                    password: req.body.password,
                    gender: req.body.gender, 
                    age: req.body.age,
                    username: req.body.username,
                    salt: Date.now()
                }
            console.log("Control" + newUser)
            await authService.register(newUser)
            return res.status(500).json({
                success: true,
                message: "Controller successfully"
            });
        } catch (error) {
            console.log("Controller Error" + error)
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }
}

export default new AuthController();

// {
//     "name": "Kly",    
//     "email": "Kly@gmail.com",
//     "password": "12333",
//     "gender": 1,
//     "age": 20,
//     "username": "user00"
// }