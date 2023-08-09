import os
from dotenv import load_dotenv
from flask import Flask
from controllers.openai_controller import openai_controller


def main():
    # load env files
    load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../.env"))

    # initiate env config
    FLASK_PORT = int(os.getenv("BE_PORT", 4300))
    FLASK_DEBUG_MODE = os.getenv("BE_DEBUG_MODE", "True").lower() == "true"

    # initiate flask
    app = Flask(__name__)

    # register blueprint controller
    app.register_blueprint(openai_controller, url_prefix="/api/openai")

    # run flask
    app.run(port=FLASK_PORT, debug=FLASK_DEBUG_MODE)


if __name__ == "__main__":
    main()
