import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

function App() {
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    // Assuming you only want to process the first accepted file
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.xlsx',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:3001/candidates/addFromExcel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success (e.g., show a success message)
      console.log('Excel processed successfully');
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error processing Excel', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the Excel file here...</p>
        ) : (
          <p>Drag 'n' drop an Excel file here, or click to select one</p>
        )}
      </form>
      {file && (
        <div>
          <p>Selected File: {file.name}</p>
          <button type="submit" onClick={handleSubmit}>
            Upload Excel
          </button>
        </div>
      )}
    </div>
  );
}

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default App;
