import { query } from './db'; 

// Get all users Endpoint
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET method is allowed' });
  }

  try {
    // Query all users from the database
    const [users] = await query('SELECT id, name, email FROM Users');

    // If no users are found, return an empty array
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Return the users
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
}
