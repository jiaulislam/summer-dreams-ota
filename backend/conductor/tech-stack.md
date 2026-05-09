# Technology Stack

## Core Technologies
- **Language:** Python 3.14+
- **Framework:** Django & Django REST Framework (DRF)
- **Database:** PostgreSQL (with `psycopg` 3)
- **Dependency Management:** `uv`
- **Linting & Formatting:** `ruff`

## Architecture & Infrastructure
- **Pattern:** Decoupled, Service-Oriented Architecture (Thin views, fat services)
- **Authentication:** JWT-based (`dj-rest-auth`, `django-allauth`, `SimpleJWT`) with Google OAuth2 support
- **External Integration:** GDS Integration (Amadeus)
- **Localization:** `django-parler` for database-level translations, `django-parler-rest` for DRF support.
