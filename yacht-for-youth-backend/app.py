from flask import Flask, jsonify
from flask_restful import Api
from flask_swagger import swagger
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS, cross_origin
from routes.contract_routes import ContractResource
from routes.document_check_routes import CheckDocumentResource

app = Flask(__name__)
api = Api(app)
CORS(app)

@app.route("/ping", methods=["GET"])
def ping():
    response = jsonify({"msg": "pong"})
    return response


# Add ContractResource to Flask-RESTful API
api.add_resource(ContractResource, "/generate-labor-contract")
api.add_resource(CheckDocumentResource, "/check-labor-contract")

# Swagger Documentation Route
@app.route("/swagger")
def get_swagger():
    """Generate Swagger API documentation."""
    swag = swagger(app) 
    swag["info"]["version"] = "1.0"
    swag["info"]["title"] = "Labor Contract API"
    return jsonify(swag)  

# Swagger UI Setup
SWAGGER_URL = "/swagger-ui"
API_URL = "/swagger"
swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL, API_URL, config={"app_name": "Labor Contract API"}
)
app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)


if __name__ == "__main__":
    app.run(debug=True, port=8080)
