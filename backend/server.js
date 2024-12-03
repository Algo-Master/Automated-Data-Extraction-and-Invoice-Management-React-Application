const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { processFile } = require("./Data Processing/FileProcessor");
const { processResponses } = require("./Data Processing/ResponseProcessor");

require("dotenv").config();

const app = express();
const port = process.env.PORT;
const Client_Url = process.env.CLIENT_URL;

const cors = require("cors");

const allowedOrigins = [
  `${Client_Url}`,
  "http://localhost:5173",
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true, // Allow cookies for authenticated requests (if applicable)
};

app.use(cors(corsOptions));

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");

// Initialize GoogleGenerativeAI with your API_KEY.
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// Initialize GoogleAIFileManager with your API_KEY.
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  // Choose a Gemini model.
  model: "gemini-1.5-flash",
});

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

// Route to upload multiple files and process with Gemini API
app.post("/upload", upload.array("files"), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const responses = [];

    for (const file of req.files) {
      const filePath = file.path;
      const mimeType = file.mimetype;

      try {
        // Convert the file to a Gemini-supported format
        const { convertedPath, convertedMimeType } = await processFile(filePath, mimeType);

        // Upload the converted file to Gemini API
        const uploadResponse = await fileManager.uploadFile(convertedPath, {
          mimeType: convertedMimeType,
          displayName: file.originalname,
        });

        console.log(
          `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`
        );

        // Generate content using Gemini API
        const result = await model.generateContent([
          {
            fileData: {
              mimeType: uploadResponse.file.mimeType,
              fileUri: uploadResponse.file.uri,
            },
          },
          {
            text: `I want you to get me a json array from this file which will contain json objects like this:
            {
                customerName: "Alice Johnson",
                phoneNumber: "9876543210",
                email: "alice.johnson@example.com",
                productName: "Wireless Mouse",
                quantity: 2,
                unitPrice: 25.5,
                tax: 5.1,
                priceWithTax: 56.1,
                totalPurchaseAmount: 56.1,
                discount: 0,
                totalAmount: 56.1,
                date: "2024-11-01",
            }
            Systematically go through the file and for each user generate this object and place it in the array
            if any of the parameter like tax or quantity is not mentioned then u should keep its value as null.
            Remember don't send me any extra data or notes or anything else of that same sort. Just the json array data`,
          },
        ]);

        responses.push(result.response.candidates);

        // Clean up local files after uploading
        fs.unlinkSync(filePath);
        if (convertedPath !== filePath) fs.unlinkSync(convertedPath);
      } catch (fileError) {
        console.error(`Error processing file ${file.originalname}:`, fileError);
        responses.push({ error: `Failed to process file: ${file.originalname}` });
      }
    }

    // Process the consolidated response
    const consolidatedData = processResponses(responses);

    // Local Testing Purposes
    console.log(consolidatedData);

    // Send consolidated data as the response
    res.json(consolidatedData);
  } catch (error) {
    console.error("Error processing files:", error);
    res.status(500).json({ error: "Error processing files" });
  }
});

// Basic health check route
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
