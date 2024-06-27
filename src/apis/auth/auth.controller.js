import authService from "./auth.service";
class AuthController{
    async login(req, res, next)
    { 
        try{
            const {username, password} = req.body;
            const user = await authService.login(username, password);
            return res.status(200).json({
                success: true,
                data: user
            });
        }catch(error){
                return res.status(500).json({
                    success: false,
                    message: "Error"
                });
        }
    }
}

export default new AuthController();