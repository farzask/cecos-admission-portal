const mammoth = require('mammoth');

async function extract() {
  const docxData = await mammoth.extractRawText({path: "CECOS Scholarships and Concessions.docx"});
  console.log("=== DOCX CONTENT ===");
  console.log(docxData.value);
}

extract();
