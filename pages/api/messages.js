let messages = [
    { senderId: '1', content: 'Hello! How is everyone?' },
    { senderId: '2', content: 'I’m good, thanks!' },
    { senderId: '1', content: 'Great to hear!' },
  ];
  
  export default function handler(req, res) {
    if (req.method === 'GET') {
      // Respond with all messages
      res.status(200).json(messages);
    } else if (req.method === 'POST') {
      // Extract the message from the request body
      const { senderId, content } = req.body;
  
      // Validate the input
      if (!senderId || !content) {
        return res.status(400).json({ message: 'Both senderId and content are required' });
      }
  
      // Create the new message and add it to the list
      const newMessage = { senderId, content };
      messages.push(newMessage);
  
      // Respond with the newly added message
      res.status(201).json(newMessage);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  