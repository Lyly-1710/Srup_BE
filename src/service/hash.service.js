import 'dotenv/config'
import bcrypt from 'bcrypt';
const saltRounds = 10;

class HashService {
    async hashPassword(plainText){
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(plainText, salt);
        return {salt, hashedPassword};
    }

    async verifyPassword(plainText, hashedPassword ){
        return bcrypt.compareSync(plainText, hashedPassword );
    }
}

export default new HashService()