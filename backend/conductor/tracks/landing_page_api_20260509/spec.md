# Specification: Multilingual Landing Page API

## 1. Objective
Implement a single-endpoint API that returns all marketing content for the landing page. The API must handle translations dynamically based on the `Accept-Language` header and return a **flattened** JSON structure.

## 2. Core Tech Stack
*   **Localization:** `django-parler` for database-level translations.
*   **Singletons:** Ensure `HeroSection`, `WhyChooseUs`, and `AgencySetting` only allow one instance in the Admin.

## 3. Model Definitions
Implement the following models using `TranslatableModel`:

*   **HeroSection (Singleton):**
    *   `title` (translatable)
    *   `subtitle` (translatable)
    *   `background_image` (ImageField)
*   **TourPackage:**
    *   `name` (translatable)
    *   `price` (DecimalField)
    *   `image` (ImageField)
    *   `is_active` (BooleanField)
    *   `order_index` (IntegerField)
*   **PopularDestination:**
    *   `name` (translatable)
    *   `description` (translatable)
    *   `image` (ImageField)
    *   `is_active` (BooleanField)
    *   `order_index` (IntegerField)
*   **WhyChooseUs (Singleton):**
    *   `section_title` (translatable)
    *   `featured_image` (ImageField)
*   **WhyChooseUsItem:**
    *   Related to `WhyChooseUs`
    *   `icon_slug` (CharField)
    *   `title` (translatable)
    *   `description` (translatable)
*   **AgencySetting (Singleton, Non-translatable):**
    *   `address`, `phone`, `email`
    *   `facebook_url`, `instagram_url`, `linkedin_url`

## 4. API Architecture & Flattening Strategy
The API must return values directly at the root of the object, rather than nested inside a `translations` key.

### Serializer Requirements
*   Implement a `FlattenTranslationMixin` or override `to_representation` in `TranslatableModelSerializer`.
*   **Logic:**
    1. Detect the current language via `request.LANGUAGE_CODE`.
    2. Extract fields from the translation table.
    3. Merge these fields into the top-level response dictionary.
    4. Remove the raw `translations` object from the final output.
*   **Absolute URLs:** Ensure all `ImageField` outputs include the full domain/protocol.

## 5. Endpoint Specification
*   **Path:** `GET /api/v1/marketing/landing-page/`
*   **Functionality:** Consolidate data from all sections into a single response.
*   **Optimization:** Use `.language(lang).prefetch_related('translations')` or `select_related` to avoid N+1 queries.

## 6. Acceptance Criteria
*   [ ] API returns 200 OK for valid requests.
*   [ ] Content is translated correctly based on the `Accept-Language` header.
*   [ ] JSON structure is flattened as specified.
*   [ ] Singletons correctly restrict to one instance in the Django Admin.
*   [ ] Image URLs are absolute.
*   [ ] Unit tests cover all models, serializers, and the final view.
*   [ ] Code coverage for the new app is >80%.
