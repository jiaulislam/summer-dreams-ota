# Implementation Plan: Contact Us Page

## Phase 1: Setup and Localization
- [x] Task: Define translations for the Contact Us page (labels, placeholders, headings) in all supported locales (e.g., `messages/en.json`, `messages/es.json`). fe1e5ee
- [ ] Task: Conductor - User Manual Verification 'Setup and Localization' (Protocol in workflow.md)

## Phase 2: UI Implementation
- [ ] Task: Create the new localized page route `src/app/[locale]/(marketing)/contact/page.tsx`.
- [ ] Task: Build the `ContactForm` component (`src/features/marketing/components/contact-form.tsx`) with Name, Email, Phone, and Message fields, including client-side validation using `zod` and `react-hook-form`.
- [ ] Task: Build the `ContactInfo` component (`src/features/marketing/components/contact-info.tsx`) displaying address, phone, email, and a styled WhatsApp redirect button (linking to `wa.me`).
- [ ] Task: Assemble the page layout in `contact/page.tsx`, displaying both components responsively.
- [ ] Task: Update the `Footer` component (`src/features/marketing/components/footer.tsx`) to link the "Contact" link to the new `/contact` route.
- [ ] Task: Conductor - User Manual Verification 'UI Implementation' (Protocol in workflow.md)

## Phase 3: Integration
- [ ] Task: Implement the API client function in `src/features/marketing/api/index.ts` to submit the contact form data.
- [ ] Task: Integrate the API submission into the `ContactForm` component using TanStack Query mutations, handling loading states and displaying success/error toast notifications.
- [ ] Task: Conductor - User Manual Verification 'Integration' (Protocol in workflow.md)
