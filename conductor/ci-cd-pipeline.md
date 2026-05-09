# Implementation Plan: CI/CD Pipeline and Docker Infrastructure

## 1. Objective
To containerize the Summer Dreams OTA application using Docker, orchestrate it via Docker Compose with Caddy as an optimized reverse proxy, and establish a robust, zero-downtime GitHub Actions CI/CD pipeline that triggers deployment on the server via SSH.

## 2. Scope & Impact
- **Backend**: Containerized using a stable, multi-stage Python 3.13-slim build leveraging `uv`. Django static files will be collected into a shared Docker volume.
- **Frontend**: Containerized using a standard, multi-stage Node.js 20 Alpine build for Next.js, optimized with `--max-old-space-size=4096`.
- **Database**: PostgreSQL 16 Alpine container with automated pre-deployment backups.
- **Reverse Proxy**: Caddy Server automatically managing SSL, serving static/media files directly, and reverse-proxying `/api/*` and `/admin/*` to Django, and all other traffic to Next.js.
- **CI/CD Pipeline**: GitHub Actions workflow for linting and testing code on Pull Requests, followed by a secure, SSH-based automated deployment on the `master` branch featuring RAM management, zero-downtime migrations, and storage pruning.

## 3. Implementation Steps

1. **Update Django Settings**: Append `STATIC_ROOT = BASE_DIR / "staticfiles"` to `backend/core/settings.py` to support Django's `collectstatic` command.
2. **Create Backend Dockerfile** (`backend/Dockerfile`): Draft a multi-stage Dockerfile that installs `uv`, syncs dependencies, and runs Gunicorn. **Update to use stable Python 3.13.**
3. **Create Frontend Dockerfile** (`frontend/Dockerfile`): Draft a multi-stage Dockerfile that runs `npm ci`, `npm run build` (with `NODE_OPTIONS="--max-old-space-size=4096"`), and `npm start`.
4. **Create Caddyfile** (`Caddyfile`): Route `/static/*` and `/media/*` to the respective Docker volumes, `/api/*` and `/admin/*` to the `backend` service, and the root `/*` to the `frontend` service.
5. **Create Orchestration Setup** (`docker-compose.yml`): Define the `db`, `backend`, `frontend`, and `caddy` services. Ensure the backend startup command *excludes* migrations (which will be run separately).
6. **Create CI/CD Workflow** (`.github/workflows/ci-cd.yml`): Define a GitHub Actions workflow with `test-backend`, `test-frontend`, and a `deploy` job using `appleboy/ssh-action`. The deploy script will execute sequentially:
   - **Database Backup**: `docker exec db pg_dump -U ${DB_USER} ${DB_NAME} | gzip > /home/backups/db_before_deploy_$(date +%F).sql.gz`
   - **Pull Code**: `git pull origin master`
   - **Sequential Build (RAM Management)**: `docker compose build frontend` followed by `docker compose build backend`
   - **Pre-Deploy Migrations (Zero-Downtime)**: `docker compose run --rm backend uv run manage.py migrate`
   - **Restart Services**: `docker compose up -d`
   - **Storage Cleanup**: `docker system prune -af --volumes` to free up NVMe space.

## 4. Verification & Testing
- **Local Verification**: Run `docker compose up --build` and verify the frontend at `http://localhost`, the API at `http://localhost/api/v1/`, and Django admin at `http://localhost/admin/`. Verify migrations apply correctly in the separate run step.
- **CI Verification**: Ensure GitHub Actions correctly lints Python code via `ruff` and Next.js via `npm run lint`, and that the SSH deployment sequence executes without OOM errors.
