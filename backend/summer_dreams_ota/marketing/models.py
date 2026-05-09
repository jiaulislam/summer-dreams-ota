from parler.models import TranslatableModel, TranslatedFields

from django.db import models
from django.utils.translation import gettext_lazy as _

from summer_dreams_ota.shared.models import BaseModel


class MarketingSingletonModel(models.Model):
    """Abstract base class for marketing models that should only have one instance."""

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj


class HeroSection(TranslatableModel, MarketingSingletonModel):
    """Hero section of the landing page."""

    translations = TranslatedFields(
        title=models.CharField(_("Title"), max_length=255),
        subtitle=models.TextField(_("Subtitle"), blank=True),
    )
    background_image = models.ImageField(_("Background Image"), upload_to="hero/")

    class Meta:
        verbose_name = _("Hero Section")
        verbose_name_plural = _("Hero Section")

    def __str__(self):
        return str(_("Hero Section"))


class TourPackage(TranslatableModel):
    """Tour packages to be featured on the landing page."""

    translations = TranslatedFields(
        name=models.CharField(_("Name"), max_length=255),
    )
    price = models.DecimalField(_("Price"), max_digits=10, decimal_places=2)
    image = models.ImageField(_("Image"), upload_to="tours/")
    is_active = models.BooleanField(_("Is Active"), default=True)
    order_index = models.PositiveIntegerField(_("Order Index"), default=0)

    class Meta:
        verbose_name = _("Tour Package")
        verbose_name_plural = _("Tour Packages")
        ordering = ["order_index", "id"]

    def __str__(self):
        return self.name


class PopularDestination(TranslatableModel):
    """Popular destinations to be featured on the landing page."""

    translations = TranslatedFields(
        name=models.CharField(_("Name"), max_length=255),
        description=models.TextField(_("Description"), blank=True),
    )
    image = models.ImageField(_("Image"), upload_to="destinations/")
    is_active = models.BooleanField(_("Is Active"), default=True)
    order_index = models.PositiveIntegerField(_("Order Index"), default=0)

    class Meta:
        verbose_name = _("Popular Destination")
        verbose_name_plural = _("Popular Destinations")
        ordering = ["order_index", "id"]

    def __str__(self):
        return self.name


class WhyChooseUs(TranslatableModel, MarketingSingletonModel):
    """Why choose us section of the landing page."""

    translations = TranslatedFields(
        section_title=models.CharField(_("Section Title"), max_length=255),
    )
    featured_image = models.ImageField(_("Featured Image"), upload_to="why_us/")

    class Meta:
        verbose_name = _("Why Choose Us")
        verbose_name_plural = _("Why Choose Us")

    def __str__(self):
        return str(_("Why Choose Us"))


class WhyChooseUsItem(TranslatableModel):
    """Items for the Why Choose Us section."""

    parent = models.ForeignKey(WhyChooseUs, related_name="items", on_delete=models.CASCADE)
    icon_slug = models.CharField(_("Icon Slug"), max_length=100)
    translations = TranslatedFields(
        title=models.CharField(_("Title"), max_length=255),
        description=models.TextField(_("Description"), blank=True),
    )
    order_index = models.PositiveIntegerField(_("Order Index"), default=0)

    class Meta:
        verbose_name = _("Why Choose Us Item")
        verbose_name_plural = _("Why Choose Us Items")
        ordering = ["order_index", "id"]

    def __str__(self):
        return self.title


class AgencySetting(MarketingSingletonModel):
    """Agency settings (non-translatable)."""

    address = models.TextField(_("Address"))
    phone = models.CharField(_("Phone"), max_length=50)
    email = models.EmailField(_("Email"))
    facebook_url = models.URLField(_("Facebook URL"), blank=True)
    instagram_url = models.URLField(_("Instagram URL"), blank=True)
    linkedin_url = models.URLField(_("LinkedIn URL"), blank=True)

    class Meta:
        verbose_name = _("Agency Setting")
        verbose_name_plural = _("Agency Settings")

    def __str__(self):
        return str(_("Agency Settings"))


class ContactInquiry(BaseModel):
    """Model to store contact form inquiries."""

    name = models.CharField(_("Name"), max_length=255)
    email = models.EmailField(_("Email"))
    phone = models.CharField(_("Phone"), max_length=50, blank=True)
    message = models.TextField(_("Message"))

    class Meta:
        verbose_name = _("Contact Inquiry")
        verbose_name_plural = _("Contact Inquiries")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.email}"
