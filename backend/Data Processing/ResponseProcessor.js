// responseProcessor.js

// Function to process Gemini API responses
function processResponses(allResponses) {
  try {
    // Extract and consolidate JSON data from all responses
    const consolidatedData = allResponses.flatMap((fileResponse) => {
      const jsonArrayText = fileResponse[0]?.content?.parts[0]?.text || "";

      // Trim the text
      const trimmedText = jsonArrayText.trim();

      // Handle potential markdown-like formatting (e.g., "```json ... ```")
      const cleanedText = trimmedText.startsWith("```json")
        ? trimmedText.slice(7, -3).trim() // Removes "```json" and trailing ```
        : trimmedText;

      // Ensure the JSON is properly closed
      const finalizedText = ensureValidJson(cleanedText);

      // Parse the finalized JSON text
      const jsonArray = JSON.parse(finalizedText);
      return jsonArray;
    });

    return consolidatedData;
  } catch (error) {
    console.error("Error processing responses:", error);
    throw new Error("Failed to process responses");
  }
}

// Function to fix incomplete JSON arrays
function ensureValidJson(text) {
  let validText = text;

  // Remove trailing characters until the last '}' is found
  while (validText.length > 0 && !validText.endsWith("}")) {
    validText = validText.slice(0, -1);
  }

  // Add the closing ']' to make it a valid JSON array
  if (!validText.endsWith("]")) {
    validText += "]";
  }

  return validText;
}

module.exports = { processResponses };
