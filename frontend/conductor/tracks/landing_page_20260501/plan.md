# Implementation Plan: Summer Dreams Landing Page

## Phase 1: Project Setup & Localization
- [ ] Task: Setup Translation Keys
    - [ ] Update `messages/en.json` and `messages/es.json` with keys for the new sections (Hero, Tour Packages, Destinations, Why Choose Us, Footer).
- [ ] Task: Configure Theme Variables
    - [ ] Update Tailwind configuration and `globals.css` with the new color palette (Deep Maroon/Burgundy, Dark Charcoal, Soft Red gradients).
- [ ] Task: Conductor - User Manual Verification 'Project Setup & Localization' (Protocol in workflow.md)

## Phase 2: Hero & Booking Widget
- [ ] Task: Implement Hero Section
    - [ ] Create the full-bleed travel background layout.
    - [ ] Implement the transparent glass-effect navigation with brand logo and "Sign In" button.
- [ ] Task: Implement Booking Widget
    - [ ] Build the floating white card with Service Tabs and Flight Options.
    - [ ] Create the 4-column search grid and the bottom-bridged search button (UI only, no API integration).
- [ ] Task: Conductor - User Manual Verification 'Hero & Booking Widget' (Protocol in workflow.md)

## Phase 3: Interactive Sections
- [ ] Task: Implement Tour Packages Carousel
    - [ ] Build the horizontal slider with destination image cards and red gradient overlays.
    - [ ] Add the central "View All Packages" button.
- [ ] Task: Implement Popular Destinations Slider
    - [ ] Build the vertically oriented image cards.
    - [ ] Implement the hover/active state interaction (width expansion, white content box reveal).
- [ ] Task: Implement "Why Choose Us" Accordion
    - [ ] Create the two-column layout with the featured glowing image.
    - [ ] Build the interactive accordion list using Tailwind CSS transitions for height expansion/collapse.
- [ ] Task: Conductor - User Manual Verification 'Interactive Sections' (Protocol in workflow.md)

## Phase 4: Global Footer & Final Assembly
- [ ] Task: Implement Global Footer
    - [ ] Build the 4-column grid layout with Dark Charcoal background.
    - [ ] Add the "Back to Top" floating utility button.
- [ ] Task: Assemble Landing Page
    - [ ] Integrate all completed components (Hero, Carousels, Accordion, Footer) into `src/app/[locale]/(marketing)/page.tsx`.
    - [ ] Ensure mobile-first responsive behavior across all components.
- [ ] Task: Conductor - User Manual Verification 'Global Footer & Final Assembly' (Protocol in workflow.md)
