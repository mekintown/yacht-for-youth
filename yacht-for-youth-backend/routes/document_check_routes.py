from flask import request
from flask_restful import Resource
import easyocr
from pdf2image import convert_from_bytes
from PIL import Image
import io
import docx


class CheckDocumentResource(Resource):
    def __init__(self):
        # Support Thai and English
        self.reader = easyocr.Reader(["th", "en"])

    def post(self):
        """
        API endpoint to validate a labor contract file.
        ---
        tags:
          - Document Check
        consumes:
          - multipart/form-data
        parameters:
          - in: formData
            name: file
            type: file
            required: true
            description: The labor contract document to check
        responses:
          200:
            description: JSON with validation results
        """
        uploaded_file = request.files.get("file")
        if not uploaded_file:
            return {"error": "No file uploaded"}, 400

        # Check file type
        ALLOWED_MIME_TYPES = {
            "image/png",
            "image/jpeg",
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }
        if uploaded_file.mimetype not in ALLOWED_MIME_TYPES:
            return {"error": "Unsupported file format"}, 400

        try:
            text = self.extract_text_from_file(uploaded_file)
            issues = self.analyze_contract_text(text)

            response_data = {
                "valid": len(issues) == 0,
                "issues": issues,
            }
            return response_data, 200  

        except Exception as e:
            return {"error": f"Failed to process document: {str(e)}"}, 500

    def extract_text_from_file(self, uploaded_file):
        """
        Extracts text from an image, PDF, or DOCX using EasyOCR and python-docx.
        """
        if uploaded_file.mimetype.startswith("image/"):
            image = Image.open(uploaded_file)
            text = self.reader.readtext(image, detail=0)
            text = " ".join(text)  

        elif uploaded_file.mimetype == "application/pdf":
            pdf_bytes = uploaded_file.read()
            images = convert_from_bytes(pdf_bytes, fmt='jpeg')
            
            # Use only one pdf page
            image = images[0]
            text = self.reader.readtext(image, detail=0)
            text = " ".join(text)
            
            # Note: OCR for multiple pdf pages took too long 
            # text = " ".join([" ".join(self.reader.readtext(img, detail=0)) for img in images[]])

        elif uploaded_file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            doc = docx.Document(uploaded_file)
            text = " ".join([para.text for para in doc.paragraphs])

        else:
            raise ValueError("Unsupported file format")

        print("text from OCR", text[:20])
        return text

    def analyze_contract_text(self, text):
        """
        Rule-based analysis of extracted contract text.
        """
        possible_issues = {
            "ชั่วโมงทำงานเกิน 8 ชั่วโมง": "พบข้อกำหนดเกินเวลาทำงาน",
            "ค่าแรงต่ำกว่า 300 บาท": "พบเงื่อนไขค่าจ้างไม่สอดคล้องกับกฎหมาย",
            "อายุต่ำกว่า 18 ปี": "พบอายุผู้จ้างงานต่ำกว่าเกณฑ์",
            "อัตราค่าจ้าง 150 บาทต่อวัน": "พบอัตราค่าจ้างต่ำกว่าค่าจ้างขั้นต่ำของกรุงเทพฯ",
            "ชั่วโมงทำงานวันละ 9 ชั่วโมง": "พบการทำงานเกินกว่ามาตรฐาน 8 ชั่วโมงต่อวัน",
            "1 สัปดาห์ทำงาน 7 วัน": "พบการทำงานไม่มีวันหยุดประจำสัปดาห์",
            "ห้ามลูกจ้างลาป่วยทุกกรณี": "พบข้อห้ามลูกจ้างลาป่วย",
            "นายจ้างต้องการ": "พบการกำหนดให้ลูกจ้างทำงานล่วงเวลาโดยไม่ได้ขอความยินยอม",
            "ลูกจ้างจะได้รับเงินค่าล่วงเวลาในอัตราเดียวกันกับค่าจ้างปกติ": "พบการไม่จ่ายค่าล่วงเวลาในอัตราที่สูงกว่าค่าจ้างปกติ",
        }

        detected_issues = [
            issue for rule, issue in possible_issues.items() if rule in text
        ]

        return detected_issues

