#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Gathering static files..."
python manage.py collectstatic --noinput

echo "Applying database migrations..."
python manage.py migrate --noinput

# Execute the command passed into the Dockerfile CMD (e.g., gunicorn)
exec "$@"
