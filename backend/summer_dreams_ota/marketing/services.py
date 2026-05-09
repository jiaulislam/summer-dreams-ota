import logging

from django.core.mail import send_mail
from django.db import transaction

from summer_dreams_ota.marketing.errors import EmailSendError
from summer_dreams_ota.marketing.models import (
    AgencySetting,
    HeroSection,
    PopularDestination,
    TourPackage,
    WhyChooseUs,
)
from summer_dreams_ota.marketing.serializers import (
    AgencySettingSerializer,
    ContactInquirySerializer,
    HeroSectionSerializer,
    PopularDestinationSerializer,
    TourPackageSerializer,
    WhyChooseUsSerializer,
)

logger = logging.getLogger(__name__)


class LandingPageService:
    """Service to consolidate marketing data for the landing page."""

    @staticmethod
    def get_landing_page_data(request):
        # 1. Hero Section (Singleton)
        hero = HeroSection.objects.prefetch_related("translations").first()
        hero_data = HeroSectionSerializer(hero, context={"request": request}).data if hero else None

        # 2. Tour Packages (Active)
        tours = TourPackage.objects.filter(is_active=True).prefetch_related("translations")[:14]
        tours_data = TourPackageSerializer(tours, many=True, context={"request": request}).data

        # 3. Popular Destinations (Active)
        destinations = PopularDestination.objects.filter(is_active=True).prefetch_related("translations")
        destinations_data = PopularDestinationSerializer(destinations, many=True, context={"request": request}).data

        # 4. Why Choose Us (Singleton)
        why_us = WhyChooseUs.objects.prefetch_related("translations", "items__translations").first()
        why_us_data = WhyChooseUsSerializer(why_us, context={"request": request}).data if why_us else None

        # 5. Agency Settings (Singleton)
        agency = AgencySetting.objects.first()
        agency_data = AgencySettingSerializer(agency).data if agency else None

        return {
            "hero": hero_data,
            "tours": tours_data,
            "destinations": destinations_data,
            "why_choose_us": why_us_data,
            "agency": agency_data,
        }


class ContactInquiryService:
    """Service to handle contact form inquiries."""

    @staticmethod
    @transaction.atomic
    def create_contact_inquiry(data: dict) -> None:
        """
        Creates a ContactInquiry record and sends an email to the agency.
        """
        serializer = ContactInquirySerializer(data=data)
        serializer.is_valid(raise_exception=True)
        inquiry = serializer.save()

        # Send email
        agency_settings = AgencySetting.objects.first()
        recipient_email = agency_settings.email if agency_settings else "contact@summerdreams.com"

        subject = f"New Contact Inquiry from {inquiry.name}"
        message = (
            f"Name: {inquiry.name}\n"
            f"Email: {inquiry.email}\n"
            f"Phone: {inquiry.phone or 'N/A'}\n\n"
            f"Message:\n{inquiry.message}"
        )

        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=None,  # Uses DEFAULT_FROM_EMAIL
                recipient_list=[recipient_email],
                fail_silently=False,
            )
        except Exception as e:
            logger.exception("Failed to send contact inquiry email")
            raise EmailSendError() from e
