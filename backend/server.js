const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8000;

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// POST endpoint to handle file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Send the file to the Gemini API
    const geminiApiUrl = 'https://api.gemini.com/your-endpoint'; // Replace with Gemini API URL
    const formData = new FormData();

    formData.append('file', fs.createReadStream(file.path));

    const response = await axios.post(geminiApiUrl, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: 'Bearer YOUR_GEMINI_API_KEY', // Replace with your API key
      },
    });

    // Clean up the uploaded file
    fs.unlinkSync(file.path);

    // Send the JSON array back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error interacting with Gemini API:', error);
    res.status(500).json({ error: 'Failed to process the file' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
