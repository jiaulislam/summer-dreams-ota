from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from summer_dreams_ota.marketing.services import (
    ContactInquiryService,
    LandingPageService,
)


class LandingPageAPIView(APIView):
    """
    API view to return all marketing content for the landing page.
    Consolidates data from HeroSection, TourPackage, PopularDestination, WhyChooseUs, and AgencySetting.
    Handles translations via parler based on the Accept-Language header.
    """

    authentication_classes = []
    permission_classes = []

    def get(self, request, *args, **kwargs):
        data = LandingPageService.get_landing_page_data(request)
        return Response(data)


class ContactUsAPIView(APIView):
    """
    API view to handle contact form submissions.
    Receives user inquiries and sends an automated email to the agency.
    """

    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        ContactInquiryService.create_contact_inquiry(request.data)
        return Response(
            {"success": True, "message": "Your message has been sent successfully!"},
            status=status.HTTP_201_CREATED,
        )
