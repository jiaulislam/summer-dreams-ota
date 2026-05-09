# Initial Concept
Backend API for Summer Dreams OTA

# Product Definition

## Vision
The Summer Dreams OTA backend serves as a robust, decoupled, and high-performance API. It acts as the central nervous system for the travel agency, orchestrating flight data from global providers and delivering content seamlessly to modern frontends.

## Core Objectives
- **GDS Orchestration:** Standardize and orchestrate communication with external Global Distribution Systems (e.g., Amadeus) for flight searches and bookings.
- **Headless CMS:** Expose Django Admin managed content (Hero Section, Tour Packages, Popular Destinations, Why Choose Us) via a consolidated, multilingual API for the Next.js frontend.
- **Secure Authentication:** Provide a robust, JWT-based authentication system with support for Google OAuth2.
- **Multilingual Support:** Dynamic, database-level translations for all marketing content, serving flattened JSON based on the `Accept-Language` header.

## Target Audience (API Consumers)
- **Next.js Frontend:** The primary B2C portal where end customers search for flights and consume marketing content.
- **Third-party Affiliates:** External partners integrating with the platform's standardized API endpoints.

## Technical Philosophy & Constraints
- **Strict Architecture:** The project mandates a service-oriented architecture. Business logic must be encapsulated within service classes, keeping views thin. All API endpoints must be explicitly versioned, strongly typed, and structured using explicit serializers.
