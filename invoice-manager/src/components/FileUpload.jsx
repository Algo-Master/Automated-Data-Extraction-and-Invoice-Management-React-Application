import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUploadedData } from "../redux/slices/dataSlice"; // Import the action

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

const FileUpload = () => {
  const dispatch = useDispatch();

  const handleUpload = async (formData) => {
    try {
      const response = await axios.post(`${BackendUrl}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Local Testing Purposes
      console.log(response.data);

      // Set the JSON array in the Redux Store
      dispatch(setUploadedData(response.data));
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const formData = new FormData();
      acceptedFiles.forEach((file) => formData.append("files", file));
  
      handleUpload(formData);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".pdf,.jpg,.xlsx",
  });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #4A5568",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: "transparent",
          height: "250px", // Set your height here
          display: "flex", // Add flexbox display
          flexDirection: "column", // Set flex direction to column
          justifyContent: "center", // Center items vertically
          alignItems: "center", // Center items horizontally
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the file here...</p>
        ) : (
          <p className="text-gray-500">
            Drag and drop a file here, or click to browse.
          </p>
        )}
      </div>
      <p className="text-sm text-gray-400 mt-2">
        Accepted formats: .pdf, .jpg, .xlsx
      </p>
    </div>
  );
};

export default FileUpload;
