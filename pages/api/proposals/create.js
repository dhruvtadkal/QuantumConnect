import { query } from '../db';

// Create a new proposal
export async function createProposal(req, res) {
    console.log("create");
  if (req.method === 'POST') {
    const { projectTitle, projectDescription } = req.body;

    if (!projectTitle || !projectDescription) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Insert the project into the 'projects' table
      const insertProjectQuery = `
        INSERT INTO projects (Project_Title, Project_Description)
        VALUES (?, ?)`;
      const projectResult = await query(insertProjectQuery, [projectTitle, projectDescription]);

      // Insert the proposal into the 'proposals' table
      const insertProposalQuery = `
        INSERT INTO proposals (Project_ID, Status, Feedback)
        VALUES (?, 'Pending', 'No feedback yet')`;
      const proposalResult = await query(insertProposalQuery, [projectResult.insertId]);

      res.status(201).json({
        message: 'Proposal created successfully',
        proposal: proposalResult,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create proposal' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

export default createProposal;
