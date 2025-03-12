import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from './db';
import { cookies } from 'next/headers' 

import { setCookie } from 'cookies-next/server';

// User Login Endpoint
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST method is allowed' });
  }

  const { email, password } = req.body;

  try {
    // Check if the user exists
    const [user] = await query('SELECT * FROM Users WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    // console.log(user);
    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log("user", user);
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.User_ID, email: user.Email },
      process.env.JWT_SECRET || 'your_secret_key', // Store secret in environment variables for production
      { expiresIn: '1h' } // Token expires in 1 hour
    );
    const payload = JSON.stringify({ auth_token: token, userID: user.User_ID });
    // Set the token as an HTTP-only cookie
    // setCookie('auth_token', token, {
    //     res,
    //     httpOnly: true, // Prevent access by JavaScript
    //     secure: true,   // Use secure flag for HTTPS
    //     maxAge: 60 * 60, // 1 hour
    //     path: '/',
    // });
    const conf=setCookie('user_id', user.User_ID, {
        res,
        httpOnly: false, // Accessible by JavaScript
        secure: true,    // Set secure flag in production
        maxAge: 60 * 60, // 1 hour
        path: '/',
      });
      console.log(conf,  user.User_ID);
    // const cookieStore = await cookies()
    // cookieStore.set('name', 'lee')


    return res.status(200).json({ message: 'Login successful', token, user_id:user.User_ID, user_name:user.Name });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
}
