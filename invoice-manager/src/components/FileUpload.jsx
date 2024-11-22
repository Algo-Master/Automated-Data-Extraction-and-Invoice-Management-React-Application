import React from 'react';

const FileUpload = () => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log('Uploaded file:', file);
  };

  return (
    <div>
      <input type="file" accept=".pdf,.jpg,.png,.xlsx" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUpload;