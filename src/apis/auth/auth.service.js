import usersModel from "../../models/users.model";
import hashService from "../../service/hash.service";
class AuthService
{
    async login(username, password)
    {
       try {
            const user = await usersModel.getUserByUsername(username);
            if(user === null)
                return new Error("User not found")
            if(!await hashService.checkPassword(username, password))
                return false;
            return user
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
                    return new Error("Already exist")
                }
            const password = await hashService.hashPassword(newUser.password)
            newUser.password = password.hashedPassword
            await usersModel.createUser(newUser, password.salt);
            return true;
        } catch (error) {
            throw error;
        }
    }
    
}
export default new AuthService();