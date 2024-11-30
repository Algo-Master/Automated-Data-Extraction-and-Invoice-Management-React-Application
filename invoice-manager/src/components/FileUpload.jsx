// import React from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setUploadedData } from "../redux/slices/dataSlice"; // Import the action

// const FileUpload = () => {
//   const dispatch = useDispatch();

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const formData = new FormData();
//       formData.append("file", file);

//       try {
//         const response = await axios.post(
//           "http://localhost:8000/upload",
//           formData,
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );

//         // Access and parse the JSON array
//         const jsonArrayText = response.data[0]?.content?.parts[0]?.text;

//         if (!jsonArrayText) {
//           console.error("Response does not contain expected JSON structure.");
//           return;
//         }

//         const trimmedText = jsonArrayText.trim();
//         const cleanedText = trimmedText.startsWith("```json")
//           ? trimmedText.slice(7, -3).trim() // Removes "```json" and trailing ```
//           : trimmedText;

//         console.log(cleanedText);
//         const jsonArray = JSON.parse(cleanedText);
//         // Dispatch the parsed data to the Redux store
//         dispatch(setUploadedData(jsonArray));
//       } catch (error) {
//         console.error("Error uploading file:", error);
//       }
//     } else {
//       console.warn("No file selected or unsupported file type.");
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".pdf,.jpg,.xlsx" onChange={handleFileUpload} />
//     </div>
//   );
// };

// export default FileUpload;

import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUploadedData } from "../redux/slices/dataSlice"; // Import the action

const FileUpload = () => {
  const dispatch = useDispatch();

  const handleUpload = async (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://localhost:8000/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        // Access and parse the JSON array
        const jsonArrayText = response.data[0]?.content?.parts[0]?.text;

        if (!jsonArrayText) {
          console.error("Response does not contain expected JSON structure.");
          return;
        }

        const trimmedText = jsonArrayText.trim();
        const cleanedText = trimmedText.startsWith("```json")
          ? trimmedText.slice(7, -3).trim() // Removes "```json" and trailing ```
          : trimmedText;

        const jsonArray = JSON.parse(cleanedText);
        // Dispatch the parsed data to the Redux store
        dispatch(setUploadedData(jsonArray));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.warn("No file provided.");
    }
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      handleUpload(acceptedFiles[0]);
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
          height: "250px",
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
