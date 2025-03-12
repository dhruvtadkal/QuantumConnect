import { query } from '../db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        const grants = await query('SELECT * FROM grants');
        res.status(200).json(grants);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch grants' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }