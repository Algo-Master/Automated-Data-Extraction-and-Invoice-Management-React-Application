const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
const sharp = require("sharp");

async function processFile(filePath, mimeType) {
  const extension = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, extension);
  const outputDir = path.join(path.dirname(filePath), "converted");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  try {
    if (
      mimeType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      extension === ".xlsx"
    ) {
      // Convert .xlsx to .csv
      const workbook = xlsx.readFile(filePath);
      const csvPath = path.join(outputDir, `${baseName}.csv`);
      xlsx.writeFile(workbook, csvPath, { bookType: "csv" });
      return { convertedPath: csvPath, convertedMimeType: "text/csv" };
    } else if (mimeType.startsWith("image/") || extension === ".jpg") {
      // Convert .jpg to .pdf
      const pdfPath = path.join(outputDir, `${baseName}.pdf`);
      await sharp(filePath).toFile(pdfPath);
      return { convertedPath: pdfPath, convertedMimeType: "application/pdf" };
    } else if (mimeType === "application/pdf" || extension === ".pdf") {
      // No conversion needed for PDFs
      return { convertedPath: filePath, convertedMimeType: "application/pdf" };
    } else {
      throw new Error("Unsupported file type");
    }
  } catch (error) {
    throw new Error(`Error processing file: ${error.message}`);
  }
}

module.exports = { processFile };
