# Django Backend Development Guidelines: Summer Dreams Travel Agency SAC

## 1. Role and Objective
You are acting as a Senior Backend Engineer. Your primary objective is to build the backend for the "Summer Dreams Travel Agency SAC" platform. Your goal is to create a decoupled, high-performance API that serves as a Headless CMS and an orchestration layer for flight data.

## 2. API Versioning Strategy
*   **Version Type:** Use **URL Path Versioning** (e.g., `/api/v1/`).
*   **Implementation:** Versions must be defined at the URL configuration level.
*   **Consistency:** All endpoints must be prefixed with the version identifier to ensure the frontend can transition between API iterations without breaking changes.
*   **Service Mapping:** When logic changes between versions, create version-specific service methods or classes if the business logic diverges significantly.

## 3. Architectural Approach
*   **Service-Based Logic:** Use a Service-oriented approach for all business logic. Logic must reside in service classes, not in models or views.
*   **Thin Views:** Views must remain thin. Their only responsibility is to receive requests, call the appropriate service, and return a response.
*   **Database Operations:** Any database operation (Create, Update, Delete) must be executed through a service class to ensure consistency and reusability.

## 4. API & Serializer Implementation
*   **No ModelViewSets:** Always use `APIView` from Django REST Framework for explicit control.
*   **Fixed Fields:** In serializers, never use `fields = '__all__'`. Always specify fixed fields.
*   **No Depth:** Do not use the `depth` attribute in serializers.
*   **Standardization:** When fetching data from external APIs (like Amadeus GDS), the backend must standardize XML/JSON/Cryptic responses before sending them to the Next.js frontend.

## 5. Code Organization & Design Patterns
*   **Project Structure:** Project-level reusable components must reside inside a `shared/` app directory.
*   **Constants:** App-level constants must be stored in a dedicated `constants.py` file within each app.
*   **Design Standards:** Follow SOLID principles, DRY (Don't Repeat Yourself), and use the Factory Pattern where appropriate.

## 6. Performance & Query Optimization
*   **N+1 Prevention:** Always write optimized querysets using `select_related` and `prefetch_related`.
*   **Caching:** Utilize Redis for aggressive caching of common routes and static dictionary data from GDS.
*   **Type Annotations:** Use Python type annotations as much as possible for models, serializers, and services. This includes type annotations for foreign key back-references.

## 7. Logging & Error Handling
*   **Mandatory Logging:** Always use a logger for both services and views.
*   **Validation Errors:** Use `logger.warning` for failed serializer validations.
*   **Service Errors:** Use `logger.exception(exc)` if an exception is available; otherwise, use `logger.error`.
*   **Centralized Errors:** Implement a central structure to catch and format third-party API timeouts or failures.

## 8. Testing & Quality Assurance
*   **Testing Framework:** Use `pytest` and `django-pytest` for all tests.
*   **Auth Bridge:** Ensure JWT-based authentication is strictly implemented to bridge the Next.js frontend and Django API securely.

## 9. Technology Stack Reference
*   **Framework:** Django / Django REST Framework (DRF) or Django Ninja.
*   **Auth:** `django-allauth` (with JWT integration).
*   **Database:** PostgreSQL.
*   **Cache:** Redis.

## 10. App Creation Protocol
To maintain a clean project structure and avoid root namespace pollution, all new domain apps must be nested within the main project directory (summer_dreams_ota/).

Follow these exact steps when scaffolding a new application:

Create the target directory inside the main project folder:
`mkdir summer_dreams_ota/<app-name>`

Run the Django startapp command using uv, explicitly pointing to the newly created directory:
`uv run python manage.py startapp <app-name> summer_dreams_ota/<app-name>`

Important: After creation, ensure that the name attribute inside the new app's apps.py file is correctly configured to reflect the nested path (e.g., name = 'summer_dreams_ota.<app-name>'), and register this full path in your config/settings.py INSTALLED_APPS array.
