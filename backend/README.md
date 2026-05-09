# Summer Dreams OTA - Backend API

## Overview
This is the backend for the **Summer Dreams Travel Agency SAC** platform. It is a decoupled, high-performance Django-based API that serves as both a **Headless CMS** and an **orchestration layer** for flight data, integrating with Global Distribution Systems (GDS) like Amadeus.

## Tech Stack
*   **Framework:** Django 6.0+, Django REST Framework (DRF) 3.17+
*   **Language:** Python 3.14+ (with strict type annotations)
*   **Database:** PostgreSQL (using `psycopg` 3)
*   **Authentication:** JWT-based (`dj-rest-auth`, `django-allauth`, `SimpleJWT`) with Google OAuth2 support.
*   **Localization:** `django-parler` for model-level data and standard Django i18n for static strings.
*   **Tooling:** `uv` (package management), `ruff` (linting & formatting), `pytest` (testing).

## Architecture
The project follows a **Service-Oriented Architecture**:
*   **Fat Services:** All business logic and database operations (CUD) must reside in `services.py`.
*   **Thin Views:** `APIView` subclasses responsible only for request parsing and calling services.
*   **Explicit Versioning:** All endpoints are prefixed with `/api/v1/`.
*   **Decoupled Frontend:** Designed to be consumed by a Next.js App Router frontend.

## Getting Started

### Prerequisites
- Python 3.14+
- `uv` installed (`curl -LsSf https://astral.sh/uv/install.sh | sh`)

### Installation
1.  **Sync dependencies:**
    ```bash
    uv sync
    ```
2.  **Configure environment:**
    Create a `.env` file based on existing requirements (DB, Sentry, Telegram, etc.).
3.  **Run migrations:**
    ```bash
    uv run manage.py migrate
    ```
4.  **Start the server:**
    ```bash
    uv run manage.py runserver
    ```

## Development Workflow

### Creating New Apps
Follow the strict nesting protocol to keep the root clean:
```bash
mkdir summer_dreams_ota/<app-name>
uv run python manage.py startapp <app-name> summer_dreams_ota/<app-name>
```
*Note: Ensure `apps.py` and `settings.py` are updated accordingly.*

### Linting & Formatting
We use `ruff` for all Python files.
*   **Manual:** `uv run ruff check .`
*   **Automatic:** A pre-commit hook is configured, and an internal Gemini hook handles fixes on file save.

### Testing
Run the test suite using `pytest`:
```bash
uv run pytest
```
*Target: >80% code coverage.*

## Localization
The API handles translations via the `Accept-Language` header.
- Model data (Marketing, Destinations) is translated using `django-parler`.
- Responses are flattened by a custom `FlattenTranslationMixin` in serializers.

## Features Implemented
- [x] JWT Authentication & Google OAuth2 Bridge.
- [x] Multilingual Marketing CMS (Hero, Packages, Destinations).
- [x] Telegram Chat Integration with individual session tracking.
- [x] Centralized Exception Handling.
