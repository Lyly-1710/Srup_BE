import usersService from './users.service';

class UsersController {
    async getUsers(req, res, next) {
        try{
            const users = await usersService.getUsers();
            return res.status(200).json({
                success: true,
                data: users
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Error"
            });
        }
    }

    async getDetailUser(req, res, next){
        try{
            const userId = req.params.id;
            const user = await usersService.getDetailUser(userId);
            return res.status(200).json({
                success: true,
                data: user
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "IError"
            });
        }
    }

    async createUser(req, res, next){
        try{
            const newUser = {
                name: req.body.name,    
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender,
                age: req.body.age,
                username: req.body.username
            }
            await usersService.createUser(newUser);
            return res.status(200).json({
                success: true,
                message: "Created User"
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Error"
            });
        }
    }

    async updateUser(req, res, next){
        try{
            const userId = req.params.id;
            const newUser = {
                name: req.body.name,    
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender,
                age: req.body.age,
                username: req.body.username
            }
            await usersService.updateUser(userId, newUser);
            return res.status(200).json({
                success: true,
                message: "Updated User"
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Error"
            });
        }
    }

    async deleteUser(req, res, next){
        try{
            const userId = req.params.id;
            await usersService.deleteUser(userId);
            return res.status(200).json({
                success: true,
                message: "Deleted User"
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Error"
            });
        }
    }
}

export default new UsersController();