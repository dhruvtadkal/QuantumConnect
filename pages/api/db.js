// import mysql from 'mysql2/promise';

// export default async function handler(req, res) {
//   const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

//   try {
//     const connection = await mysql.createConnection({
//       host: DB_HOST,
//       port: DB_PORT,
//       user: DB_USER,
//       password: DB_PASSWORD,
//       database: DB_NAME,
//       waitForConnections: true,
//       connectionLimit: 10,
//       queueLimit: 0
//     });

//     const [rows] = await connection.query('SELECT * FROM Projects');
//     res.status(200).json(rows);

//     await connection.end();
//   } catch (error) {
//     console.error('Database connection failed:', error);
//     res.status(500).json({ error: 'Database connection failed' });
//   }
// }

import mysql from 'mysql2/promise';
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});

export async function query(sql, values) {
  const [rows] = await pool.execute(sql, values);
  return rows;
}
