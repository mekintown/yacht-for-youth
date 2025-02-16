from flask import Flask, request, send_file, jsonify
from services.contract_service import ContractService
from domain.contract_model import LaborContractData
from pydantic import ValidationError

app = Flask(__name__)

CONTRACT_TEMPLATE_PATH = "templates/labor_contract_template.docx"
contract_service = ContractService(CONTRACT_TEMPLATE_PATH)

@app.route('/generate-labor-contract', methods=['POST'])
def generate_labor_contract():
    try:
        data_json = request.get_json()
        contract_data = LaborContractData(**data_json)  # validate & parse
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400

    output_path = contract_service.generate_contract(contract_data)

    return send_file(output_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
