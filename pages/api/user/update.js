import { query } from '../db';

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { user_id, bio, name } = req.body;
    try {
        // Validate input
        if (!user_id || !bio || !name) {
        return res.status(400).json({ error: 'Missing required fields' });
        }
        const result = await query(
            'UPDATE Users SET bio = ?, name = ? WHERE user_id = ?',
            [bio, name, user_id]
        );
    
        // Check if any row was updated
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const existingInterests = await query('SELECT interest_id, interest_description FROM research_interests');
        const interestMap = new Map(existingInterests.map(interest => [interest.interest_description.toLowerCase(), interest.interest_id]));

        let newInterestIds = [];
        for (const interest of existingInterests) {
            const normalizedInterest = interest.toLowerCase();
          
            if (!interestMap.has(normalizedInterest)) {
              // Add new interest to the table
              const result = await query(
                'INSERT INTO research_interests (interest_description) VALUES (?)',
                [interest]
              );
              interestMap.set(normalizedInterest, result.insertId); // Update the map with the new interest
              newInterestIds.push(result.insertId);
            } else {
              newInterestIds.push(interestMap.get(normalizedInterest)); // Use existing interest_id
            }
        
        }
        for (const interestId of newInterestIds) {
            await query(
              'INSERT IGNORE INTO users_research_interests (user_id, interest_id) VALUES (?, ?)',
              [user_id, interestId]
            );
          }
    
        return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Failed to update user' });
    }
}