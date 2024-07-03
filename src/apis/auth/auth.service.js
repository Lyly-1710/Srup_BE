import usersModel from "../../models/users.model";
class AuthService
{
    async login(username, password)
    {
       try {
            const user = await usersModel.getUserByUsername(username);
            console.log(user)
            if(user === null)
                return new Error("User not found")
            if(user.password !== password)
                return new Error("Password is incorrect")
            return user
       } catch (error) {
        throw error
       }
    }

    async register(newUser)
    {
        try {
            console.log(newUser);
            await usersModel.createUser(newUser);
        } catch (error) {
            throw error;
        }
    }
    
}
export default new AuthService();