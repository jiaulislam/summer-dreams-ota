# --- Stage 1: Builder ---
FROM python:3.13-slim-bookworm AS builder

# Prevent Python from writing .pyc files
# UV_LINK_MODE=copy prevents dead symlinks across Docker stages
# UV_PYTHON_DOWNLOADS=never forces uv to use the container's Python 3.13
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy \
    UV_PYTHON_DOWNLOADS=never

WORKDIR /app

# Pull the official uv binary
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml uv.lock ./

# Install dependencies only
RUN uv sync --frozen --no-dev --no-install-project


# --- Stage 2: Final Production Image ---
FROM python:3.13-slim-bookworm

# Add the virtual environment to the PATH
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/app/.venv/bin:$PATH"

WORKDIR /app

# Install runtime libraries + gettext
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    gettext \
    && rm -rf /var/lib/apt/lists/*

# Copy the fully populated .venv from the builder stage
COPY --from=builder /app/.venv /app/.venv

# Create user and directories
RUN useradd -m django-user && \
    mkdir -p /app/staticfiles /app/media && \
    chown -R django-user:django-user /app

# Copy project code
COPY --chown=django-user:django-user . .

# Make the entrypoint script executable
RUN chmod +x /app/entrypoint.sh

# Compile translations
RUN python manage.py compilemessages

# Switch to the non-root user
USER django-user

# Port for Gunicorn
EXPOSE 8000

# Set the entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "core.wsgi:application"]
