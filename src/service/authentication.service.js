import jwt from 'jsonwebtoken';

class UserIdentityService {
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET;
    }

    async sign(user) {
        return jwt.sign({id:user.ID}, this.JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });
    }
    verify(token) {
        return jwt.verify(token, this.JWT_SECRET);
    }
}
export default UserIdentityService;