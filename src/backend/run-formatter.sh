#!/bin/bash

# Get the script's directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Change the working directory to the script's directory
cd "$SCRIPT_DIR"

# find the black execution binary
BLACK="$(which black)"

# check if black execution binary exists
if [ -z "$BLACK" ]; then 
    echo "Error 'black' command not found."
    exit 1
fi

# Check if there are staged files
STAGED_FILES=$(git diff --cached --name-only --relative -- '*.py')

# If there are staged .py files, run Black only on them
if [ -n "$STAGED_FILES" ]; then
    echo "Running Black on staged .py files..."
    echo "$STAGED_FILES" | xargs -I{} "$BLACK" "$SCRIPT_DIR/{}"
else
    echo "No staged .py files found. Running Black on all backend files..."
    "$BLACK" "$SCRIPT_DIR/controllers/"*.py
    "$BLACK" "$SCRIPT_DIR/middleware/"*.py
    "$BLACK" "$SCRIPT_DIR/schemas/"*.py
    "$BLACK" "$SCRIPT_DIR/"*.py
fi
