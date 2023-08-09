from flask import Blueprint as __Blueprint, request as __request, jsonify as __jsonify
import openai as __openai
from middleware import requires_authorization as __requires_authorization

openai_controller = __Blueprint("openai_controller", __name__)


@openai_controller.route("/answer", methods=["POST"])
@__requires_authorization
def __answer_handler():
    try:
        return __jsonify({"message": "under construction", "data": None})
    except Exception as e:
        return __jsonify({"errorMessage": str(e)}), 500


@openai_controller.route("/models", methods=["GET"])
@__requires_authorization
def __models_handler():
    try:
        __openai.api_key = __request.authorization.token
        models = __openai.Model.list()["data"]
        filtered_models = [model["id"] for model in models if model["id"].startswith("gpt")]
        return __jsonify({"message": "success get data models", "data": filtered_models})
    except Exception as e:
        return __jsonify({"errorMessage": str(e)}), 500

