import { query } from '../db';
import { parseCookies } from 'nookies'; 
// import { cookies } from 'next/headers' 
import { getCookie } from 'cookies-next/client';
export default async function handler(req, res) {

  if (req.method === 'POST') {
    try {
      const { grantId, userId } = req.body;

      if (!grantId) {
        return res.status(400).json({ error: 'Grant ID is required' });
      }
      // Get the current user from cookies
        // const cookie = getCookie('auth_data');
        // if (cookie) {
        //     const { auth_token, userID } = JSON.parse(cookie);
        //     userId = userID;
        //     if (!userID) {
        //         return res.status(401).json({ error: 'Unauthorized: User not logged in' });
        //     }
            
        // }
        

      // Add the grant to the user's grants table
      const insertQuery = `
        INSERT INTO Users_Grants (User_ID, Grant_ID, Registration_Status)
        VALUES (?, ?, 'Pending')`;
      await query(insertQuery, [userId, grantId]);

      res.status(201).json({ message: 'Grant application submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to apply for grant' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
