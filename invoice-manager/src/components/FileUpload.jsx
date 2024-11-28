import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUploadedData } from "../redux/slices/dataSlice"; // Import the action

const FileUpload = () => {
  const dispatch = useDispatch();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

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

        console.log(cleanedText);
        const jsonArray = JSON.parse(cleanedText);
        // Dispatch the parsed data to the Redux store
        dispatch(setUploadedData(jsonArray));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.warn("No file selected or unsupported file type.");
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf,.jpg,.csv" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUpload;
