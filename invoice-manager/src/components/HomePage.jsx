import React from "react";
import FileUpload from "./FileUpload";

const HomePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Your Files</h1>
      <FileUpload />
    </div>
  );
};

export default HomePage;
