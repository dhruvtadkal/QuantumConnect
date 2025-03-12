import { query } from '../db'; // Assuming `query` is your database connection utility
import { getCookie } from 'cookies-next/server'; // For fetching the current user

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Parse cookies to get the current user ID
      const userId = await getCookie('user_id', {req});
      // const userId = cookies.userId; // Replace 'userId' with your actual cookie key for the user ID
        // console.log("user",userId, req);
      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      // Query to fetch the user's grants along with grant details
      const userGrantsQuery = `
        SELECT ug.grant_id, g.Grant_Title, g.Deadline, ug.Registration_Status, ug.Applied_date
        FROM users_grants ug
        INNER JOIN grants g ON ug.grant_id = g.Grant_ID
        WHERE ug.user_id = ?
    `;

      const userGrants = await query(userGrantsQuery, [userId]);

      res.status(200).json(userGrants);
    } catch (error) {
      console.error('Error fetching user grants:', error);
      res.status(500).json({ error: 'Failed to fetch user grants' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
