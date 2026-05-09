# Summer Dreams Travel Agency SAC - OTA Platform

## Overview
Summer Dreams OTA is a high-performance, SEO-optimized Online Travel Agency platform. It is designed with a decoupled architecture, leveraging a robust Django backend as a Headless CMS and flight data orchestration layer, and a modern Next.js frontend for a premium user experience.

## Key Features
- **Flight Engine:** Real-time flight search and orchestration integrated with Amadeus GDS.
- **Headless CMS:** Dynamic content management via Django Admin, supporting multilingual marketing assets and destinations.
- **Multilingual Support:** Full internationalization on both backend (django-parler) and frontend (next-intl).
- **Live Support:** Integrated Telegram chat widget with individual session tracking.
- **Secure Auth:** JWT-based authentication bridging Next.js and Django, including Google OAuth2 support.

## Project Structure
- **/backend**: Django REST API. Managed with `uv`. [Details](./backend/README.md)
- **/frontend**: Next.js (App Router) application. [Details](./frontend/README.md)
- **/conductor**: Project methodology artifacts, workflow definitions, and style guides.
- **/docs**: Product requirements and detailed analysis.

## Tech Stack
### Backend
- **Framework:** Django 6.0+, DRF 3.17+
- **Language:** Python 3.14+
- **Database:** PostgreSQL
- **Tooling:** `uv`, `ruff`, `pytest`

### Frontend
- **Framework:** Next.js 16 (React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, `shadcn/ui`
- **State/Auth:** TanStack Query, NextAuth.js v5

## Getting Started

### Prerequisites
- Python 3.14+
- Node.js 20+
- `uv` (Python package manager)

### Development Setup
1. **Clone the repository.**
2. **Setup Backend:**
   ```bash
   cd backend
   uv sync
   uv run manage.py migrate
   uv run manage.py runserver
   ```
3. **Setup Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Methodology
This project follows the **Conductor Workflow**, a plan-driven development approach emphasizing:
- **TDD:** Test-Driven Development is mandatory.
- **Quality Gates:** >80% code coverage requirement.
- **Traceability:** All work is tracked via `plan.md` files and documented using Git notes.

See `conductor/workflow.md` for full operational details.
