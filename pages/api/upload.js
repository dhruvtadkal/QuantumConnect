import fs from 'fs';
import { NextResponse } from "next/server";

import path from "path";
import { writeFile } from "fs/promises";

const formidable = require('formidable');

// export const config = {
//   api: {
//     bodyParser: false, // Disables Next.js default body parser
//   },
// };

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { fileName } = req.body;

    if (!fileName) {
      return res.status(400).json({ success: false, message: 'File name is required.' });
    }

    // For simplicity, we just log the file name here
    console.log('Received file:', fileName);

    return res.status(200).json({ success: true, message: `File "${fileName}" successfully received.` });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
}