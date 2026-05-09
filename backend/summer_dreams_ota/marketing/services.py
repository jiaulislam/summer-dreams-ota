from summer_dreams_ota.marketing.models import (
    AgencySetting,
    HeroSection,
    PopularDestination,
    TourPackage,
    WhyChooseUs,
)
from summer_dreams_ota.marketing.serializers import (
    AgencySettingSerializer,
    HeroSectionSerializer,
    PopularDestinationSerializer,
    TourPackageSerializer,
    WhyChooseUsSerializer,
)


class LandingPageService:
    """Service to consolidate marketing data for the landing page."""

    @staticmethod
    def get_landing_page_data(request):
        # 1. Hero Section (Singleton)
        hero = HeroSection.objects.prefetch_related("translations").first()
        hero_data = HeroSectionSerializer(hero, context={"request": request}).data if hero else None

        # 2. Tour Packages (Active)
        tours = TourPackage.objects.filter(is_active=True).prefetch_related("translations")
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
