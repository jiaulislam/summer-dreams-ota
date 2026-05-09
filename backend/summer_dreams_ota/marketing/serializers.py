from parler_rest.serializers import TranslatableModelSerializer
from rest_framework import serializers

from summer_dreams_ota.marketing.models import (
    AgencySetting,
    HeroSection,
    PopularDestination,
    TourPackage,
    WhyChooseUs,
    WhyChooseUsItem,
)


class FlattenTranslationMixin:
    """
    Mixin to flatten translations in DRF serializers.
    Extracts fields from the translation table and merges them into the top-level response.
    """

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        translations = ret.pop("translations", None)

        if translations:
            # Detect current language from request or context
            request = self.context.get("request")
            lang_code = getattr(request, "LANGUAGE_CODE", None) if request else None

            # If a specific language is active, prioritize its translation
            if lang_code and lang_code in translations:
                ret.update(translations[lang_code])
            # Fallback to the first available translation if the active one isn't found
            elif translations:
                # Use the first language code in the dictionary
                first_lang = next(iter(translations))
                ret.update(translations[first_lang])

        return ret


class HeroSectionSerializer(FlattenTranslationMixin, TranslatableModelSerializer):
    class Meta:
        model = HeroSection
        fields = ("title", "subtitle", "background_image", "translations")


class TourPackageSerializer(FlattenTranslationMixin, TranslatableModelSerializer):
    class Meta:
        model = TourPackage
        fields = ("name", "price", "image", "is_active", "order_index", "translations")


class PopularDestinationSerializer(FlattenTranslationMixin, TranslatableModelSerializer):
    class Meta:
        model = PopularDestination
        fields = ("name", "description", "image", "is_active", "order_index", "translations")


class WhyChooseUsItemSerializer(FlattenTranslationMixin, TranslatableModelSerializer):
    class Meta:
        model = WhyChooseUsItem
        fields = ("icon_slug", "title", "description", "order_index", "translations")


class WhyChooseUsSerializer(FlattenTranslationMixin, TranslatableModelSerializer):
    items = WhyChooseUsItemSerializer(many=True, read_only=True)

    class Meta:
        model = WhyChooseUs
        fields = ("section_title", "featured_image", "items", "translations")


class AgencySettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgencySetting
        fields = (
            "address",
            "phone",
            "email",
            "facebook_url",
            "instagram_url",
            "linkedin_url",
        )
