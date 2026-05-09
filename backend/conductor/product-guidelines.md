# Product Guidelines

## Tone and Voice
- **Inspiring & Adventurous:** The content and copy should evoke excitement and wanderlust, appealing to travelers' sense of adventure. While the API is technical, documentation and user-facing content (managed via the Headless CMS) must maintain this inspiring tone.

## Error Handling and API Communication
- **Standardized & Descriptive:** The API must communicate errors using a consistent, standardized JSON structure. Error messages should be descriptive, user-friendly, and capable of being localized to ensure a seamless experience for end customers on the Next.js frontend.

## Content Localization
- **Database-Level Translations:** Multilingual content must be managed at the database level. For models requiring translations (like marketing content or destinations), utilize dynamic, database-level translation solutions (e.g., `django-parler`) to ensure scalable and maintainable localization.
