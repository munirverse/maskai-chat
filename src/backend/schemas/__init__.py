import os as __os
import json as __json


def __load_scehmas():
    schemas = {}
    schemas_folder = __os.path.dirname(__file__)
    for filename in __os.listdir(schemas_folder):
        if filename.endswith(".json"):
            schema_name = __os.path.splitext(filename)[0]
            with open(__os.path.join(schemas_folder, filename), "r") as schema_file:
                schemas[schema_name] = __json.load(schema_file)
    return schemas


schemas = __load_scehmas()
