import { query } from './db';
import { getCookie } from 'cookies-next/server'; 

export default async function handler(req, res) {
    // Simulated events data (you can replace this with a database query later)
    // const dummyEvents = [
    //   { EventID: 1, EventTitle: 'AI in Healthcare', EventDate: '2024-12-01' },
    //   { EventID: 2, EventTitle: 'Renewable Energy Summit', EventDate: '2024-12-15' },
    //   { EventID: 3, EventTitle: 'Quantum Computing Conference', EventDate: '2025-01-10' },
    // ];
  
    // Check if the request method is GET
    if (req.method === 'GET') {

        const user_id = await getCookie('user_id', {req}); // Get user_id from query params

        if (!user_id) {
            return res.status(400).json({ message: 'user_id is required' });
        }

        try {
            // Fetch the events the user is registered for, joining the users_events and events tables
            const events = await query(`
                SELECT ue.event_id, e.event_title, e.event_date, ue.registration_status
                FROM users_events ue
                INNER JOIN events e ON ue.event_id = e.event_id
                WHERE ue.user_id = ?
            `, [user_id]);

            // Return the list of events
            res.status(200).json(events);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to retrieve events' });
        }


    }
    else {
      // Handle any other HTTP methods (like POST, PUT, DELETE) here if needed
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  