import mysql from 'mysql2/promise';

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'ly@17102004',
	database: 'sgr_be',
	port: 3306
});

export default pool;