import formidable from 'formidable';
import fs from 'fs';

// Temporary in-memory file storage (you can use a database in production)
let uploadedFiles = [];

// Parse incoming FormData and handle file upload
// export const config = {
//   api: {
//     bodyParser: false, // Disable the default body parser to use formidable
//   },
// };

export default function handler(req, res) {


  if (req.method === 'GET') {
    // Return the list of uploaded files
    
    return res.status(200).json({ files: uploadedFiles });
  }

  if (req.method === 'POST') {
    // Handle file upload
    const file = req.body.file;
    let formData = {}
    console.log(req.body);
    formData.uploadDir = "./public/uploads"; // Specify upload folder
    formData.keepExtensions = true; // Retain file extension
    console.log(file);
    // form.parse(req, (err, fields, files) => {
    //   if (err) {
    //     return res.status(500).json({ error: 'Error parsing file' });
    //   }
    // });

      // Assuming we only handle one file at a time
    //   const file = files.file[0];
      const fileData = {
        fileName: file,
        filePath: `/uploads/${file}`,
        uploadDate: new Date().toISOString(),
      };
      uploadedFiles.push(fileData);
      // Store file metadata in an array (or database)
      
      return res.status(200).json({ file: fileData });
    
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
