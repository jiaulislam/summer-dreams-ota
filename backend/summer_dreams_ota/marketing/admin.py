from parler.admin import TranslatableAdmin, TranslatableStackedInline

from django.contrib import admin, messages

from summer_dreams_ota.marketing.models import (
    AgencySetting,
    ContactInquiry,
    HeroSection,
    PopularDestination,
    TourPackage,
    WhyChooseUs,
    WhyChooseUsItem,
)

LIST_PER_PAGE = 15


@admin.register(HeroSection)
class HeroSectionAdmin(TranslatableAdmin):
    """Admin for HeroSection singleton."""

    def has_add_permission(self, _request):
        # Prevent adding more than one instance
        if self.model.objects.exists():
            return False
        return super().has_add_permission(_request)

    def has_delete_permission(self, _request, _obj=None):
        # Prevent deleting the single instance
        return False


@admin.register(TourPackage)
class TourPackageAdmin(TranslatableAdmin):
    """Admin for TourPackage."""

    list_display = ("name", "price", "is_active", "order_index")
    list_editable = ("is_active", "order_index")
    list_filter = ("is_active",)
    list_per_page = LIST_PER_PAGE


@admin.register(PopularDestination)
class PopularDestinationAdmin(TranslatableAdmin):
    """Admin for PopularDestination."""

    list_display = ("name", "is_active", "order_index")
    list_editable = ("is_active", "order_index")
    list_filter = ("is_active",)
    list_per_page = LIST_PER_PAGE

    def changelist_view(self, request, extra_context=None):
        active_count = self.model.objects.filter(is_active=True).count()
        if active_count > 5:
            messages.warning(
                request,
                f"Currently there are {active_count} active popular destinations. "
                "It is recommended to have a maximum of 5 to avoid UI breakages on the frontend.",
            )
        else:
            messages.info(
                request,
                "Recommendation: Maintain a maximum of 5 active popular destinations for optimal UI display.",
            )
        return super().changelist_view(request, extra_context=extra_context)


class WhyChooseUsItemInline(TranslatableStackedInline):
    """Inline for WhyChooseUsItem."""

    model = WhyChooseUsItem
    extra = 1


@admin.register(WhyChooseUs)
class WhyChooseUsAdmin(TranslatableAdmin):
    """Admin for WhyChooseUs singleton."""

    inlines = [WhyChooseUsItemInline]

    def has_add_permission(self, _request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(_request)

    def has_delete_permission(self, _request, _obj=None):
        return False


@admin.register(AgencySetting)
class AgencySettingAdmin(admin.ModelAdmin):
    """Admin for AgencySetting singleton."""

    def has_add_permission(self, _request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(_request)

    def has_delete_permission(self, _request, _obj=None):
        return False


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    """Admin for ContactInquiry."""

    list_display = ("name", "email", "phone", "created_at")
    list_filter = ("created_at",)
    search_fields = ("name", "email", "message")
    readonly_fields = ("created_at", "updated_at")
    ordering = ("-created_at",)

    def has_add_permission(self, _request):
        # Inquiries should only be created via the API
        return False

    def has_change_permission(self, _request, _obj=None):
        # Inquiries should be read-only
        return False
