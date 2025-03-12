import { query } from '../db';

export async function modifyProposal(req, res) {
    if (req.method == 'POST') {
        const { proposalId } = req.query; // Get the proposal proposalId from the query parameters
        const { projectTitle, projectDescription } = req.body;
    
        if (!proposalId) {
        return res.status(400).json({ error: 'Proposal proposalId is required' });
        }
    
        try {
        // If projectTitle or projectDescription is provided, update the project details
            if (projectTitle || projectDescription) {
            let updateProjectQuery = 'UPDATE projects SET ';
            const updateParams = [];

            if (projectTitle) {
                updateProjectQuery += 'Project_Title = ? ';
                updateParams.push(projectTitle);
            }

            if (projectDescription) {
                if (projectTitle) updateProjectQuery += ', ';
                updateProjectQuery += 'Project_Description = ? ';
                updateParams.push(projectDescription);
            }

            updateProjectQuery += 'WHERE Project_ID = (SELECT Project_ID FROM proposals WHERE Proposal_ID = ?)';
            updateParams.push(proposalId);

            // Update the project details in the projects table
            await query(updateProjectQuery, updateParams);
            }
        
    
            res.status(200).json({
                message: 'Proposal updated successfully',
            });
        } 
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update proposal' });
        }
    }
}


export default modifyProposal;
