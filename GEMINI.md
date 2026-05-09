# GEMINI.md - Summer Dreams OTA (Root)

## Project Overview
Summer Dreams Travel Agency SAC is a comprehensive Online Travel Agency (OTA) platform. It follows a decoupled architecture with a robust Django backend and a high-performance Next.js frontend. The system acts as a Headless CMS and an orchestration layer for flight data, integrating with Global Distribution Systems (GDS) like Amadeus.

### Project Structure
- **/backend**: Django 6.0+ REST API. See [backend/GEMINI.md](./backend/GEMINI.md) for details.
- **/frontend**: Next.js 16+ Web Application. See [frontend/GEMINI.md](./frontend/GEMINI.md) for details.
- **/conductor**: Project management artifacts, workflow definitions, and code style guides.
- **/docs**: General documentation and requirement analysis.

## Core Technologies
- **Backend:** Python 3.14+, Django, Django REST Framework, PostgreSQL, `uv` (package manager), `ruff` (linter).
- **Frontend:** TypeScript, Next.js (App Router), React 19, Tailwind CSS, shadcn/ui, TanStack Query, NextAuth.js v5.
- **Methodology:** Conductor (Plan-driven development, strict TDD, >80% code coverage).

## Building and Running
The project consists of two main services that should be run independently during development.

### Backend
1. Navigate to `/backend`.
2. Sync dependencies: `uv sync`.
3. Run migrations: `uv run manage.py migrate`.
4. Start server: `uv run manage.py runserver`.
5. Run tests: `uv run pytest`.

### Frontend
1. Navigate to `/frontend`.
2. Install dependencies: `npm install`.
3. Start development server: `npm run dev`.
4. Build for production: `npm run build`.

## Development Workflow
This project adheres to the **Conductor Workflow**. Key principles include:
1. **The Plan is the Source of Truth:** All work must be tracked in `plan.md` files within respective tracks.
2. **Test-Driven Development (TDD):** Write failing unit tests before implementing functionality (Red-Green-Refactor).
3. **High Quality Gates:** Aim for >80% code coverage.
4. **Commits:** Follow semantic commit messages and include task summaries via Git notes (as specified in `conductor/workflow.md`).

For detailed instructions on each component, refer to their respective sub-directory `GEMINI.md` files.
