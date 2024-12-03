const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
const PDFDocument = require("pdfkit");

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
    } else if (mimeType === "image/jpeg" || extension === ".jpg") {
      // Convert .jpg to .pdf
      const pdfPath = path.join(outputDir, `${baseName}.pdf`);
      const doc = new PDFDocument();
      const writeStream = fs.createWriteStream(pdfPath);
      doc.pipe(writeStream);

      // Embed the image
      doc.image(filePath, {
        fit: [1000, 1400], // Adjust this based on desired PDF layout
        align: "center",
        valign: "center",
      });

      doc.end();

      // Wait for the PDF to finish writing
      await new Promise((resolve, reject) => {
        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
      });

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
