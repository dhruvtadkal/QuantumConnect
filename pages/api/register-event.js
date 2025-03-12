import { query } from './db'; // Assuming you have the query utility function

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userID, eventID } = req.body;
    console.log(userID, eventID)
    // Check if both userID and eventID are provided
    if (!userID || !eventID) {
      return res.status(400).json({ message: 'User ID and Event ID are required.' });
    }

    try {
      // Check if the user is already registered for the event
      const checkQuery = 'SELECT * FROM users_events WHERE user_id = ? AND event_id = ?';
      const checkResult = await query(checkQuery, [userID, eventID]);

      if (checkResult.length > 0) {
        return res.status(400).json({ message: 'User is already registered for this event.' });
      }

      // Insert into user_events with the current timestamp
      const insertQuery = `
        INSERT INTO users_events (user_id, event_id, registration_status) 
        VALUES (?, ?, 'Registered')
      `;
      await query(insertQuery, [userID, eventID]);

      // Return success message
      res.status(200).json({ message: 'Event registered successfully!' });
    } catch (error) {
      console.error("Error registering user for event:", error);
      res.status(500).json({ message: 'Error registering event.' });
    }
  } else {
    // If the method is not POST, return 405 Method Not Allowed
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
