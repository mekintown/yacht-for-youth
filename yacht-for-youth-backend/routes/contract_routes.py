from flask import request, jsonify, send_file, make_response
from flask_restful import Resource
from marshmallow import ValidationError
from services.contract_service import ContractService
from domain.contract_schema import LaborContractSchema
import traceback

CONTRACT_TEMPLATE_PATH = "templates/labor_contract_template.docx"
contract_service = ContractService(CONTRACT_TEMPLATE_PATH)
contract_schema = LaborContractSchema()

class ContractResource(Resource):
    def post(self):
        try:
            data_json = request.get_json()
            validated_data = contract_schema.load(data_json)
        except ValidationError as e:
            return jsonify({"error": f"Validation Error: {str(e)}"}), 400
        except Exception as e:
            return jsonify({"error": f"Invalid request data: {str(e)}"}), 400

        try:
            doc_stream = contract_service.generate_contract_in_memory(validated_data)
            return send_file(
                doc_stream,
                as_attachment=True,
                download_name="labor_contract.docx",
                mimetype="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            )
        except Exception:
            error_trace = traceback.format_exc()
            print(f"Internal Server Error:\n{error_trace}")
            return jsonify({"error": "Failed to generate contract. Please try again later."}), 500
