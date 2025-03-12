
import { query } from '../db'; // Your database connection

export default async function handler(req, res) {

  try {
    // Fetch user data
    const { user_id } = req.body;
    const userQuery = `SELECT name, email, bio FROM users WHERE user_id = ?`;
    const userResult = await query(userQuery, [user_id]);
    

    if (!userResult.length) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(userResult);
    const { name, email, bio } = userResult[0];
    
    // Fetch research interests
    const interestsQuery = `
      SELECT ri.interest_description
      FROM research_interests ri
      JOIN users_research_interests uri ON ri.interest_id = uri.interest_id
      WHERE uri.user_id = ?`;

    const interestsResult = await query(interestsQuery, [user_id]);
    
    const researchInterests = interestsResult.map(row => row.interest_description);
    console.log("int",researchInterests);
    // Fetch projects associated with the user
    const projectsQuery = `SELECT project_title FROM projects WHERE user_id = ?`;
    const projectsResult = await query(projectsQuery, [user_id]);

    const projectTitles = projectsResult.map(row => row.project_title);

    // Send the response
    res.json({ name, email, bio, researchInterests, projectTitles });

  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

