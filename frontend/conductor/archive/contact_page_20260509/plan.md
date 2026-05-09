# Implementation Plan: Contact Us Page

## Phase 1: Setup and Localization [checkpoint: c9a0404]
- [x] Task: Define translations for the Contact Us page (labels, placeholders, headings) in all supported locales (e.g., `messages/en.json`, `messages/es.json`). afa357d
- [x] Task: Conductor - User Manual Verification 'Setup and Localization' (Protocol in workflow.md) c9a0404

## Phase 2: UI Implementation [checkpoint: 5f4e7d2]
- [x] Task: Create the new localized page route `src/app/[locale]/(marketing)/contact-us/page.tsx`. 8185817
- [x] Task: Build the `ContactForm` component (`src/features/marketing/components/contact-form.tsx`) with Name, Email, Phone, and Message fields, following the existing pattern of using native forms and `FormData`. d5f1953
- [x] Task: Build the `ContactInfo` component (`src/features/marketing/components/contact-info.tsx`) displaying address, phone, email, and a styled WhatsApp redirect button (linking to `wa.me`). d5f1953
- [x] Task: Assemble the page layout in `contact-us/page.tsx`, displaying both components responsively. d5f1953
- [x] Task: Refine page design with a themed header and background to improve navbar visibility and visual appeal. dd72181
- [x] Task: Update the `Footer` component (`src/features/marketing/components/footer.tsx`) to link the "Contact" link to the new `/contact-us` route. d5f1953
- [x] Task: Conductor - User Manual Verification 'UI Implementation' (Protocol in workflow.md) d5f1953

## Phase 3: Integration [checkpoint: caef476]
- [x] Task: Implement the API client function in `src/features/marketing/api/index.ts` to submit the contact form data. c7539da
- [x] Task: Integrate the API submission into the `ContactForm` component using TanStack Query mutations, handling loading states and displaying success/error toast notifications. 9f26588
- [x] Task: Conductor - User Manual Verification 'Integration' (Protocol in workflow.md) caef476
