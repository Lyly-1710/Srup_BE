import usersModel from "../../models/users.model";
import hashService from "../../service/hash.service";
import authenticationService from "../../service/authentication.service";
import mailService from "../../service/mail.service";
import 'dotenv/config';

class AuthService
{
    async login(username, password)
    {
       try {
            const user = await usersModel.getUserByUsername(username);
            if(user === null)
                return new Error("User not found")
            if(!await hashService.verifyPassword(password, user.password))
                return false
            return user;
       } catch (error) {
        throw error
       }
    }

    async register(newUser)
    {
        try {
            const user = await usersModel.getUserByUsername(newUser.username)
            if( user != null)
                {
                    return false;
                }
            const password = await hashService.hashPassword(newUser.password)
            newUser.password = password.hashedPassword
            await usersModel.createUser(newUser, password.salt);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async forgotPassword(email) 
    {   
        
        try {
            const user = await usersModel.getUserByEmail(email);
            if(user == null)
                {
                    return false;
                }
            const tokenReset = await authenticationService.sign(user);
            const expired = new Date(Date.now() + 10 * 60 * 1000);
            await mailService.sendMail(user.email, "Your token", tokenReset); 
            await usersModel.updateToken(user.id, expired);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async resetPassword(tokenReset, newPassword)
    {
        try {
            const user = await usersModel.getUserByToken(tokenReset);
            if(user === null)
                return false;
            if(user.expired > process.env.JWT_EXPIRES_IN)
            {
                tokenReset = null;
                await usersModel.updateToken(tokenReset, user.id, user.expired);
                return false;
            }
            const password = (await hashService.hashPassword(newPassword)).hashedPassword;
            await usersModel.updatePassword(user.id, password);
            return true;
        } catch (error) {
            throw error;
        }

    }
    
}
export default new AuthService();