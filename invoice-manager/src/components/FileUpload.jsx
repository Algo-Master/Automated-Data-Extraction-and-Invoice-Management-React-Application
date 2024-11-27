import React from 'react';
import { useDispatch } from 'react-redux';
import { setUploadedData } from '../redux/slices/dataSlice'; // Import the action

const FileUpload = () => {
  const dispatch = useDispatch();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result); // Parse the uploaded file data

          // Check if the JSON data matches your expected format (array of records)
          if (Array.isArray(jsonData)) {
            // Dispatch the parsed data to the Redux store
            dispatch(setUploadedData(jsonData));
            console.log('Uploaded data:', jsonData);
          } else {
            console.error('Invalid data format: Expected an array of records.');
          }
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };

      reader.readAsText(file);
    } else {
      console.warn('No file selected or unsupported file type.');
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf,.jpg,.png,.xlsx,.json"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default FileUpload;