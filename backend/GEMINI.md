# Summer Dreams Travel Agency - Backend Project (GEMINI.md)

## Project Overview
This is the backend for the **Summer Dreams Travel Agency SAC** platform. It is a decoupled, high-performance Django-based API that serves as both a **Headless CMS** and an **orchestration layer** for flight data (integrating with GDS providers like Amadeus).

### Key Technologies
*   **Framework:** Django 6.0+ & Django REST Framework (DRF) 3.17+
*   **Language:** Python 3.14+ (Strict type annotations required)
*   **Dependency Management:** `uv`
*   **Database:** PostgreSQL (`psycopg` 3)
*   **Authentication:** JWT-based (`dj-rest-auth` + `django-allauth` + `SimpleJWT`). **Google OAuth2** must be supported.
*   **Caching:** Redis (Optional for now. For aggressive caching of GDS data and dictionary data).
*   **SEO & Localization:** Support for multilingual content and SEO-friendly structures (bridging to Next.js).

---

## Core Travel Features & Backend Responsibilities
*   **Flight Engine:** Support for one-way, round-trip, and multi-city searches.
*   **GDS Integration:**
    *   Communicate with **Amadeus** (GDS).
    *   **Standardization:** Standardize XML/JSON/Cryptic responses from external APIs before sending them to the Next.js frontend.
*   **Headless CMS:** Expose Django Admin managed content (Static pages, marketing assets, FAQs) via API for the Next.js frontend (utilizing SSG/ISR).
*   **Error Handling:** Implement a centralized structure to catch, format, and safely pass third-party API timeouts or failures.

---

## Building and Running
The project uses `uv` for environment and dependency management.

### Setup
```bash
# Sync dependencies and create virtual environment
uv sync
```

### Development Server
```bash
# Run Django development server
uv run manage.py runserver
```

### Database & Migrations
```bash
# Apply migrations
uv run manage.py migrate

# Create new migrations
uv run manage.py makemigrations
```

### Testing
```bash
# Run tests using pytest
uv run pytest
```

### Linting & Automation
*   **Manual:** `uv run ruff check .`
*   **Automatic:** An `AfterTool` hook is configured in `.gemini/settings.json`. It automatically runs `uv run ruff check --fix` on any `.py` file modified by `write_file` or `replace`.

---

## Architectural Mandates
These rules are foundational and must be strictly followed.

### 1. Service-Oriented Architecture
*   **Business Logic:** MUST reside in service classes (e.g., `services.py` within each app).
*   **Thin Views:** Views are only responsible for request parsing, calling a service, and returning a response.
*   **CUD Operations:** All Create, Update, and Delete operations must be handled by services.

### 2. API Implementation Standards
*   **Explicit Views:** Use `APIView` only. **Do not use ModelViewSets.**
*   **Versioning:** All API endpoints must use URL path versioning (e.g., `/api/v1/`).
*   **Serializers:**
    *   Always specify fixed fields.
    *   Never use `fields = '__all__'` or the `depth` attribute.
*   **Shared Components:** Reusable logic and utilities must reside in the `summer_dreams_ota/shared/` app.

### 3. App Creation Protocol
To avoid root namespace pollution, all new domain apps must be nested within `summer_dreams_ota/`.
1.  **Create Directory:** `mkdir summer_dreams_ota/<app-name>`
2.  **Scaffold:** `uv run python manage.py startapp <app-name> summer_dreams_ota/<app-name>`
3.  **Configure:** In `apps.py`, set `name = 'summer_dreams_ota.<app-name>'`.
4.  **Register:** Use the full path (`summer_dreams_ota.<app-name>`) in `INSTALLED_APPS`.

### 4. Coding Conventions
*   **Imports:**
    *   ALL imports MUST be at the top module level. Never perform imports inside functions, methods, or other local scopes.
    *   **Absolute Paths:** Always use absolute import paths (e.g., `from summer_dreams_ota.authentication.errors import UserAlreadyExistsError`) instead of relative imports (e.g., `from .errors import ...`).
*   **Type Annotations:**
    *   Use Python type annotations for all models, serializers, and services.

    *   **Union Types:** Always use the `|` operator for union type annotations (e.g., `str | None`) instead of `Union` from the `typing` module.
*   **Constants:** App-level constants must be stored in `constants.py`.

### 5. Error Handling Protocol
*   **Centralized Handler:** Use the `custom_exception_handler` from `summer_dreams_ota.shared`.
*   **Shared Errors:** Use `SerializerError` and `NotFoundError` from `summer_dreams_ota.shared.errors` for standard validation and 404 scenarios.
*   **App-Specific Errors:** Each app MUST have its own `errors.py` file.
*   **Service Errors:** Service-level business logic failures must use custom error classes defined in the app's `errors.py`, subclassing `AbstractError` from `shared`.

*   **Query Optimization:** Use `select_related` and `prefetch_related` to prevent N+1 queries.
*   **Logging:**
    *   `logger.warning` for serializer validation failures.
    *   `logger.exception` for caught exceptions.
    *   Centralized error formatting for 3rd-party API failures.

---

## Development Roadmap (TODOs)
*   [ ] Implement URL versioning in `core/urls.py`.
*   [ ] Register `summer_dreams_ota.shared` in `INSTALLED_APPS`.
*   [ ] Implement JWT authentication bridge.
