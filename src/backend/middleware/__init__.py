from functools import wraps as __wraps
from flask import request as __request, jsonify as __jsonify
from jsonschema import validate as __validate, ValidationError as __ValidationError


def requires_authorization(f):
    @__wraps(f)
    def decorated(*args, **kwargs):
        try:
            if __request.authorization is None:
                raise ValueError("authorization header is no set")

            if __request.authorization.token is None:
                raise ValueError("authorization token is not set")

            return f(*args, **kwargs)
        except ValueError as value_error:
            return __jsonify({"errorMessage": str(value_error)}), 401

    return decorated


def validate_request_body(schema_json):
    def decorator(f):
        @__wraps(f)
        def decorated(*args, **kwargs):
            try:
                if schema_json is None:
                    raise __ValidationError("schema json is empty")
                __validate(instance=__request.get_json(), schema=schema_json)
                return f(*args, **kwargs)
            except __ValidationError as validation_error:
                return __jsonify({"errorMessage": str(validation_error)}), 400
            except Exception as e:
                return __jsonify({"errorMessage": str(e)}), 500

        return decorated

    return decorator
