from flask import request
from flask_restful import Resource
import random

class CheckDocumentResource(Resource):
    def post(self):
        """
        Mock endpoint to validate a labor contract file.
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

        # Mock analysis
        possible_issues = [
            "พบข้อกำหนดเกินเวลาทำงาน",
            "พบเงื่อนไขค่าจ้างไม่สอดคล้องกับกฎหมาย",
            "พบอายุผู้จ้างงานต่ำกว่าเกณฑ์",
        ]
        random.shuffle(possible_issues)
        num_issues = random.randint(0, len(possible_issues))
        selected_issues = possible_issues[:num_issues]

        response_data = {
            "valid": num_issues == 0,
            "issues": selected_issues,
        }
        return response_data, 200  
