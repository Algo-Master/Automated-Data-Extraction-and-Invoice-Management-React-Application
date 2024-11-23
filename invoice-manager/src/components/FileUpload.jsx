import React from 'react';
import { useDispatch } from 'react-redux';
import { setUploadedData } from '../redux/slices/uploadedDataSlice';

const FileUpload = () => {
  const dispatch = useDispatch();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.type === 'application/json') {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          dispatch(setUploadedData(jsonData)); // Send parsed data to Redux
          console.log('Uploaded data:', jsonData);
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };

      reader.readAsText(file);
    } else {
      console.warn('Please upload a valid JSON file.');
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf,.jpg,.png,.xlsx,.json" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUpload;
