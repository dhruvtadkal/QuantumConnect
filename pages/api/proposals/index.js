import { query } from '../db';

// Fetch and combine proposals with their related projects
export async function getProposalsWithProjects(req, res) {
console.log("index");
  if (req.method === 'GET') {
    try {
      // Fetch proposals and join them with project details
      const queryText = `
        SELECT 
          p.Proposal_ID,
          p.Project_ID,
          p.Status,
          p.Feedback,
          proj.Project_Title,
          proj.Project_Description
        FROM 
          proposals p
        JOIN 
          projects proj
        ON 
          p.Project_ID = proj.Project_ID
      `;
      
      const result = await query(queryText);
    //   console.log(result);

      res.status(200).json(result); // Return the combined proposals with project details
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch proposals with projects' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

export default getProposalsWithProjects;
