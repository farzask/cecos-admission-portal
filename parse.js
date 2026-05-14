import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';

async function extract() {
  const dataBuffer = fs.readFileSync('Discipline Category List Based on Tests.pdf');
  const pdfData = await pdf(dataBuffer);
  console.log("=== PDF CONTENT ===");
  console.log(pdfData.text);
}

extract();
