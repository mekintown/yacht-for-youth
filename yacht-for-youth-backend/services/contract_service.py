import os
from docxtpl import DocxTemplate
from domain.contract_model import LaborContractData

class ContractService:
    def __init__(self, template_path: str):
        self.template_path = template_path
    
    def generate_contract(self, data: LaborContractData) -> str:
        """
        Merges data with the labor_contract_template.docx and returns output file path.
        """
        template = DocxTemplate(self.template_path)

        context = data.dict()

        template.render(context)

        output_filename = f"labor_contract_{data.employee_name}.docx"
        output_path = os.path.join("generated_docs", output_filename)

        os.makedirs("generated_docs", exist_ok=True)
        template.save(output_path)

        return output_path
