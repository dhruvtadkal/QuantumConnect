import React, { useState, useEffect } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Fetch uploaded files from the backend on component mount
  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        const response = await fetch('/api/files'); // Adjust to your backend API
        if (response.ok) {
          const result = await response.json();
          setUploadedFiles(result.files); // Assuming backend returns files in `files` field
        } else {
          console.error('Error fetching files');
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchUploadedFiles();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (file) {
      setUploading(true);

      // Create FormData to send the file
      console.log(file);
      const formData = new FormData();
      formData.append("file", file.name);

      try {
        // Send the file to the backend via POST request
        const response = await fetch('/api/files', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({file: file.name})
        });

        if (response.ok) {
          const result = await response.json();
          // Update the uploaded files list on the frontend
          setUploadedFiles((prevFiles) => [...prevFiles, result.file]); // Add new file to the list
        } else {
          alert("Error uploading file");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file");
      } finally {
        setUploading(false);
        setFile(null); // Clear the file input
      }
    }
  };

  return (
    <div className="file-upload p-4 bg-neutral-focus rounded-lg shadow-lg shadow-cyan-500/50">
      <h3 className="text-xl font-bold text-gray-200 mb-4">Upload Files</h3>
      <form onSubmit={handleFileUpload}>
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full mb-4"
          disabled={uploading}
        />
        <button
          type="submit"
          className="btn bg-cyan-400 hover:bg-cyan-500 text-white w-full"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <h4 className="mt-4 text-gray-300">Uploaded Files:</h4>
      <ul className="list-disc pl-5 text-gray-200">
        {uploadedFiles.length > 0 ? (
          uploadedFiles.map((file, index) => (
            <li key={index}>
              <strong>Name:{file.fileName}</strong>
              <br />
              <span className="text-sm text-gray-400">
                Uploaded: {file.uploadDate}
              </span>
            </li>
          ))
        ) : (
          <li className="text-gray-400">No files uploaded yet.</li>
        )}
      </ul>
    </div>
  );
};

export default FileUpload;
