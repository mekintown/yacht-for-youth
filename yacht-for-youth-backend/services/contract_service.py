import io
from docxtpl import DocxTemplate

class ContractService:
    def __init__(self, template_path: str):
        self.template_path = template_path

    def generate_contract_in_memory(self, data: dict) -> io.BytesIO:
        try:
            template = DocxTemplate(self.template_path)
            template.render(data)

            file_stream = io.BytesIO()
            template.save(file_stream)
            file_stream.seek(0)  
            return file_stream
        except Exception as e:
            raise Exception(f"Error generating contract: {str(e)}")
