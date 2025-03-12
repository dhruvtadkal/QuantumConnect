import { query } from './db';  // Using named import now
import bcrypt from 'bcrypt';

// User Registration Endpoint
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST method is allowed' });
  }

  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const [existingUser] = await query('SELECT * FROM Users WHERE email = ?', [email]);
    if (existingUser && existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    await query('INSERT INTO Users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
}
