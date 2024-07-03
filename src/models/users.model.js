import pool from "../config/database.config"
class UsersModel {
     async getUsers() {
        const connection = await pool.getConnection();
        const [rows,fields] = await connection.query('SELECT * FROM users')
        connection.release();
        return rows;
    }

    async getDetailUser(userId){
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE id = ?`; 
            const value = [userId];
            const [rows,fields] = await connection.query(query, value);
            connection.release();
            return rows[0];
        }catch(error){
            throw error;
        }
    }

    async createUser(user){
        try{
            const connection = await pool.getConnection();
            const query = `INSERT INTO users (name, email, password, gender, age, username) VALUES (?, ?, ?, ?, ?, ?)`;
            console.log(user);
            const {name, email, password, gender, age, username} = user;
            const value = [name, email, password, gender, age, username];
            await connection.query(query, value);
            return { sucess: true, message: "Create successfully" }
        }catch(error){
            throw error;
        }
    }

    async updateUser(userId, user){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE users SET name = ?, email = ?, password = ?, gender = ?, age = ?, username = ? WHERE id = ?`;
            const {name, email, password, gender, age, username} = user;
            const value = [name, email, password, gender, age, username, userId];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }

    async deleteUser(userId){
        try{
            const connection = await pool.getConnection();
            const query = `DELETE FROM users WHERE id = ?`; 
            const value = [userId];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }

    async getUserByUsername(username)
    {
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE username = ?`; 
            const value = [username];
            const [row,fields] = await connection.query(query, value);
            return row[0];
        }catch(error){
            throw error;
        }
    }
}

export default new UsersModel();