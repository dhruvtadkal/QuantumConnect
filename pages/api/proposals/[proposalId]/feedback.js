import { query } from '../../db';

// Handle feedback for a specific proposal
export async function updateFeedback(req, res) {
  const { proposalId } = req.query;  // Get ProposalID from the URL path
  const { feedback } = req.body;     // Get feedback from the request body

  if (req.method === 'POST') {
    if (!feedback) {
      return res.status(400).json({ error: 'Feedback is required' });
    }

    try {
      // Update the feedback for the proposal with the given ProposalID
      const updateQuery = `
        UPDATE proposals
        SET Feedback = ?
        WHERE Proposal_ID = ?`;
        
      await query(updateQuery, [feedback, proposalId]);

      res.status(200).json({ message: 'Feedback updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update feedback' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

export default updateFeedback;
