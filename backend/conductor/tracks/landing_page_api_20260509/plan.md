# Implementation Plan: Multilingual Landing Page API

This plan outlines the steps to implement the Multilingual Landing Page API for Summer Dreams OTA.

## Phase 1: Environment & Scaffolding
Setting up the new app and installing dependencies.

- [x] Task: Create the `marketing` app in `summer_dreams_ota/` [7ebdac1]
- [x] Task: Install and configure `django-parler` [fa6fa43]
    - [x] Add `django-parler` to `pyproject.toml`
    - [x] Add `parler` to `INSTALLED_APPS`
    - [x] Configure `PARLER_LANGUAGES` in `core/settings.py`
- [x] Task: Conductor - User Manual Verification 'Phase 1: Environment & Scaffolding' (Protocol in workflow.md)

## Phase 2: Data Models & Admin
Implementing the translatable models and singleton logic.

- [x] Task: Implement Phase 2: Data Models & Admin [e76a951]
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Data Models & Admin' (Protocol in workflow.md)

## Phase 3: Serializers & Flattening Logic
Implementing DRF serializers with the flattening strategy.

- [ ] Task: Implement `FlattenTranslationMixin` for serializers
    - [ ] Write tests for `FlattenTranslationMixin`
    - [ ] Implement mixin in `summer_dreams_ota.shared` (or marketing app if preferred)
- [ ] Task: Implement Serializers for all models
    - [ ] Write tests for serializers (verify flattening and absolute URLs)
    - [ ] Implement `HeroSectionSerializer`, `TourPackageSerializer`, `PopularDestinationSerializer`, `WhyChooseUsSerializer`, `AgencySettingSerializer`
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Serializers & Flattening Logic' (Protocol in workflow.md)

## Phase 4: API Endpoint & Service Logic
Implementing the consolidated landing page view.

- [ ] Task: Implement LandingPageService
    - [ ] Write tests for `LandingPageService` (verify data consolidation and language handling)
    - [ ] Implement service logic to fetch and consolidate data
- [ ] Task: Implement LandingPageAPIView
    - [ ] Write tests for `LandingPageAPIView` (verify endpoint response and translations)
    - [ ] Implement `LandingPageAPIView` at `/api/v1/marketing/landing-page/`
- [ ] Task: Conductor - User Manual Verification 'Phase 4: API Endpoint & Service Logic' (Protocol in workflow.md)

## Phase 5: Final Validation & Cleanup
Ensuring everything is polished and meets coverage requirements.

- [ ] Task: Verify high code coverage (>80%) for the `marketing` app
- [ ] Task: Perform final manual verification with the Next.js frontend team (simulated)
- [ ] Task: Conductor - User Manual Verification 'Phase 5: Final Validation & Cleanup' (Protocol in workflow.md)
