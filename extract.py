import sys
from pypdf import PdfReader

def extract_text(pdf_path):
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

with open("pdf_out.txt", "w", encoding="utf-8") as f:
    f.write(extract_text("Discipline Category List Based on Tests.pdf"))
