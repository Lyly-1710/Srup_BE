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
            if(!user)
                {
                    return res.status(401).json({
                        success: false, message: "Invalid username or password"
                    })
                    
                }
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
            const { name, email, password,gender, age, username} = req.body;
            if(await authService.register({ name, email, password,gender, age, username})) 
                {
                    
                }
            return res.status(201).json({
                success: true, message: "Created User"
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