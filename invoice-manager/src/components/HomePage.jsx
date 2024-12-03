import React from "react";
import FileUpload from "./FileUpload";

const HomePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Your Files</h1>
      <FileUpload />
      
      {/* Added Guidelines Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Guidelines</h2>
        <ul className="list-disc list-inside">
          <li>Wait for some time for the data to be displayed.</li>
          <li>Double-tap on any cell to edit the data.</li>
          <li>
            Double-tap on the column head to sort the data; filtering is also enabled.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
