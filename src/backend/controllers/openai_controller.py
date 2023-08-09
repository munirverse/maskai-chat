from flask import Blueprint as __Blueprint, request as __request, jsonify as __jsonify
import openai as __openai
from middleware import (
    requires_authorization as __requires_authorization,
    validate_request_body as __validate_request_body,
)
from schemas import schemas as __schemas

openai_controller = __Blueprint("openai_controller", __name__)


@openai_controller.route("/answer", methods=["POST"])
@__requires_authorization
@__validate_request_body(schema_json=__schemas.get("answer_handler_request_body"))
def __answer_handler():
    try:
        __openai.api_key = __request.authorization.token
        request = __request.get_json()
        raw_responses = __openai.ChatCompletion.create(
            model=request.get("model"),
            messages=request.get("messages"),
            temperature=0.7,
        )
        response = raw_responses.get("choices", [])[0].get("message", {}).get("content")
        if response is None:
            raise ValueError("response content is not exists")
        request.get("messages").append({"role": "assistant", "content": response})
        return __jsonify(
            {
                "message": "success get answer from chatgpt",
                "data": {"answer": response, "context": request.get("messages")},
            }
        )
    except Exception as e:
        return __jsonify({"errorMessage": str(e)}), 500


@openai_controller.route("/models", methods=["GET"])
@__requires_authorization
def __models_handler():
    try:
        __openai.api_key = __request.authorization.token
        models = __openai.Model.list()["data"]
        filtered_models = [
            model["id"] for model in models if model["id"].startswith("gpt")
        ]
        return __jsonify(
            {"message": "success get data models", "data": filtered_models}
        )
    except Exception as e:
        return __jsonify({"errorMessage": str(e)}), 500
