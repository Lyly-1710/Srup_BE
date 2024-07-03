import 'dotenv/config';
import jwt from 'jsonwebtoken';

export default function verify (req, res, next) {
    console.log("Vao verify")

    let token = req.headers.authorization;

    if(token){
        // Verify the token using jwt.verify method
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);        
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