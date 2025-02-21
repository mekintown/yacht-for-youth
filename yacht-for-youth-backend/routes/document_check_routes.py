from flask import request
from flask_restful import Resource
import easyocr
from pdf2image import convert_from_bytes
from PIL import Image
import docx
import os

MODEL_STORAGE_PATH = "/var/data/easyocr_model"

class CheckDocumentResource(Resource):
    # Static class variable to hold the model in memory once
    reader = None

    def __init__(self):
        self.ensure_model_persistent()

    def ensure_model_persistent(self):
        if os.path.exists(MODEL_STORAGE_PATH) and len(os.listdir(MODEL_STORAGE_PATH)) > 0:
            print("EasyOCR model already exists in persistent storage. Skipping download.")
            return
        
        print("Downloading EasyOCR model for the first time...")
        os.makedirs(MODEL_STORAGE_PATH, exist_ok=True)
        easyocr.Reader(["th", "en"], model_storage_directory=MODEL_STORAGE_PATH)

    def get_reader(self):
        if CheckDocumentResource.reader is None:
            print("Loading EasyOCR model into memory...")
            
            CheckDocumentResource.reader = easyocr.Reader(
            ["th", "en"], model_storage_directory=MODEL_STORAGE_PATH, download_enabled=False, detector="dbnet18" 
        )
        return CheckDocumentResource.reader

    def post(self):
        """
        API endpoint to validate a labor contract file.
        """
        uploaded_file = request.files.get("file")
        if not uploaded_file:
            return {"error": "No file uploaded"}, 400

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
            return {"valid": len(issues) == 0, "issues": issues}, 200  

        except Exception as e:
            return {"error": f"Failed to process document: {str(e)}"}, 500

    def extract_text_from_file(self, uploaded_file):
        """
        Extracts text from an image, PDF, or DOCX using EasyOCR and python-docx.
        """
        reader = self.get_reader()

        if uploaded_file.mimetype.startswith("image/"):
            image = Image.open(uploaded_file)
            text = reader.readtext(image, detail=0)
            text = " ".join(text)

        elif uploaded_file.mimetype == "application/pdf":
            pdf_bytes = uploaded_file.read()
            images = convert_from_bytes(pdf_bytes, fmt='jpeg', dpi=100)  # Reduce DPI to lower memory usage
            image = images[0]  # Process only the first page
            text = reader.readtext(image, detail=0)
            text = " ".join(text)

        elif uploaded_file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            doc = docx.Document(uploaded_file)
            text = " ".join([para.text for para in doc.paragraphs])

        else:
            raise ValueError("Unsupported file format")

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

        return [issue for rule, issue in possible_issues.items() if rule in text]
