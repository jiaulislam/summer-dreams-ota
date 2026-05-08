# Specification: Summer Dreams Landing Page

## Overview
Develop a high-performance, responsive landing page for Summer Dreams Travel Agency using Next.js and Tailwind CSS. The design focuses on a premium travel experience featuring a glassmorphism hero section, interactive carousels, accordions, and a global footer. The implementation will use `next-intl` for multilingual support and prioritize Mobile-First responsive design.

## Functional Requirements
1.  **Design System:**
    *   **Palette:** Primary: Deep Maroon/Burgundy; Secondary: Dark Charcoal (#1a1d23); Accent: Soft Red gradients.
    *   **Typography:** Inter (Sans-serif) with tight letter spacing for headings.
    *   **Aesthetics:** Glassmorphism UI, Basic Tailwind CSS transitions for smooth micro-interactions (sliders, accordions).
2.  **Hero & Booking Section:**
    *   **Background:** Full-bleed, high-resolution placeholder travel image.
    *   **Navigation:** Transparent glass-effect header with brand logo (left) and "Sign In" button (right).
    *   **Booking Widget (UI Only):** Centered floating white card featuring Service Tabs (Flight, Visa, Holiday), Flight Options (One Way, Round Trip), a 4-column Search Grid (From, To, Date, Passengers), and a search button bridging the bottom.
3.  **Tour Packages (Carousel):**
    *   **Header:** "Our Tour Packages" with a short accent underline.
    *   **Cards:** Destination images with bottom-up red gradient overlays, "Destination Name", and "Starts From [Price]".
    *   **Layout:** Horizontal slider (draggable/arrows) and a "View All Packages" button below.
4.  **Popular Destinations (Interactive Slider):**
    *   **Layout:** "Popular Tourist Destinations" section with vertically oriented image cards (large border radii).
    *   **Interaction:** Focus/Active state expands width slightly and reveals a white content box (title, description, CTA arrow).
5.  **"Why Choose Us" (Interactive Accordion):**
    *   **Layout:** Two-column desktop layout. Column A: Featured image with glowing border and "Why Choose Summer Dreams" heading. Column B: Vertical Accordion list.
    *   **Accordion Items:** "Trusted Brand", "Book Now Pay Later", "Seamless Checkout". Height-based CSS animations for expansion/collapse.
6.  **Global Footer:**
    *   **Background:** Solid Dark Charcoal (#1a1d23).
    *   **Grid:** 4-column layout (Brand Info, Discover Links, Support Links, Travel Links).
    *   **Utility:** "Back to Top" floating button in the bottom right corner.
7.  **Internationalization:**
    *   All new text across the Hero, Carousels, Accordions, and Footer must be mapped using `next-intl` (en.json and es.json).

## Technical Details
-   **Animations:** Use Tailwind CSS transitions for micro-interactions (no Framer Motion initially).
-   **Images:** Utilize `next/image` with high-quality placeholder URLs (e.g., Unsplash). Lazy-load carousel assets.
-   **Responsive:** Mobile (1 col) -> Tablet (2 cols) -> Desktop (4 cols).
-   **Accessibility:** Ensure keyboard accessibility for tabs, accordions, and carousel arrows.
