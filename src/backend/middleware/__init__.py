from functools import wraps as __wraps
from flask import request as __request, jsonify as __jsonify


def __requires_authorization(f):
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

requires_authorization = __requires_authorization
