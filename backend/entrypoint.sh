#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Gathering static files..."
python manage.py collectstatic --noinput

echo "Applying database migrations..."
python manage.py migrate --noinput

echo "Checking superuser status..."
if [ "$DJANGO_SUPERUSER_EMAIL" ] && [ "$DJANGO_SUPERUSER_PASSWORD" ]; then
    python manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
email = '$DJANGO_SUPERUSER_EMAIL'
password = '$DJANGO_SUPERUSER_PASSWORD'
if not User.objects.filter(email=email).exists():
    print(f"Creating superuser: {email}")
    User.objects.create_superuser(email=email, password=password)
else:
    print(f"Superuser {email} already exists.")
END
fi

# Execute the command passed into the Dockerfile CMD (e.g., gunicorn)
exec "$@"
