# Specification: Contact Us Page

## 1. Overview
The goal of this track is to create a new "Contact Us" page and link it from the existing footer contact link. This page will allow users to reach out to the agency directly via a contact form or through a direct WhatsApp redirect.

## 2. Functional Requirements
- **Contact Form:**
  - Implement a form with the following fields: Name, Email, Phone, and Message.
  - Implement form validation (required fields, valid email format).
- **Submission:**
  - Submit the form data to a backend API endpoint.
  - Display loading state during submission.
  - Display success or error toast notifications upon completion.
- **WhatsApp Support:**
  - Add a dedicated button or section for "Message us on WhatsApp".
  - Clicking the button should redirect the user to WhatsApp (via `wa.me` link) to send a message to a configured agency number.
- **Page Layout:**
  - Create a multi-column layout (or stacked on mobile).
  - One section will contain the Contact Form.
  - The other section will display company contact details (Address, Phone, Email) and the WhatsApp redirect button.
- **Navigation:**
  - Update the "Contact Us" link in the footer to point to this new page route.

## 3. Non-Functional Requirements
- **Localization:** Ensure all text strings on the page (labels, placeholders, contact info headings) are localized using `next-intl`.
- **Styling:** Use Tailwind CSS and `shadcn/ui` components to match the existing design system. The page should be responsive (Mobile-First).
- **Performance:** Keep the page lean and ensure it fits within the Next.js App Router architecture.

## 4. Acceptance Criteria
- [ ] The Contact Us page is accessible via the `/contact-us` (localized) route.
- [ ] The link in the footer successfully navigates to the Contact Us page.
- [ ] The page displays the form, company contact information, and a WhatsApp redirect button.
- [ ] The form contains Name, Email, Phone, and Message fields.
- [ ] Form submission sends data to the designated API and handles success/error states gracefully.
- [ ] Clicking the WhatsApp button redirects the user to WhatsApp with the correct phone number.
- [ ] All text on the page is fully localized.

## 5. Out of Scope
- Map integration (Google Maps, etc.).
- Direct integration with Telegram (this will use a standard API endpoint).
