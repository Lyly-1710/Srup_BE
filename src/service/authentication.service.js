import jwt from 'jsonwebtoken';
import 'dotenv/config'

class userIdentityService {
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET;
        this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
    }

    async sign(user) {
        return jwt.sign({id:user.ID}, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRES_IN, algorithm: 'HS256' });
    }
    verify(token) {
        return jwt.verify(token, this.JWT_SECRET);
    }
}
export default new userIdentityService();