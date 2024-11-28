const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

const cors = require("cors");

const allowedOrigins = [
  "https://your-frontend-domain.com",
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

// Route to upload file and process with Gemini API
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const mimeType = req.file.mimetype;
    const displayName = req.file.originalname;

    // Upload the file to Gemini API
    const uploadResponse = await fileManager.uploadFile(filePath, {
      mimeType,
      displayName,
    });

    console.log(
      `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`
    );

    // Generate content (e.g., summary) using Gemini API
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
            if any of the parameter like tax or quantity is not mentioned then u should keep its value as null.`,
      },
    ]);

    // Clean up the local file after uploading
    fs.unlinkSync(filePath);

    //For local Testing
    console.log(result);

    // Send the response back to the client
    res.json(result.response.candidates);
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Error processing file" });
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
