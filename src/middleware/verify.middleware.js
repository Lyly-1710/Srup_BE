import 'dotenv/config';
import jwt from 'jsonwebtoken';
import authenticationService from '../service/authentication.service';

export default function verify (req, res, next) {
    console.log("Vao verify")

    let token = req.headers.authorization;

    if(token){
        // Verify the token using jwt.verify method
        const decode = authenticationService.verify(token)  
        req.user = decode;
        next();
    }else{
        req.user = undefined;
        return res.json({
            login: false,
            data: 'error'
        });
    }
  }