import { query } from './db';
export default async function handler(req, res) {
    // Simulated events data (you can replace this with a database query later)
    // const dummyEvents = [
    //   { EventID: 1, EventTitle: 'AI in Healthcare', EventDate: '2024-12-01' },
    //   { EventID: 2, EventTitle: 'Renewable Energy Summit', EventDate: '2024-12-15' },
    //   { EventID: 3, EventTitle: 'Quantum Computing Conference', EventDate: '2025-01-10' },
    // ];
  
    // Check if the request method is GET
    if (req.method === 'GET') {
        const queryText = 'SELECT Event_ID, Event_Title, Event_Date FROM events';
      
      // Execute the query
      const result = await query(queryText);
      // Respond with the events list
      res.status(200).json(result);
    }
    else {
      // Handle any other HTTP methods (like POST, PUT, DELETE) here if needed
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  