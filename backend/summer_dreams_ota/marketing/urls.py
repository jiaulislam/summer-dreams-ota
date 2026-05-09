from django.urls import path

from summer_dreams_ota.marketing.views import ContactUsAPIView, LandingPageAPIView

app_name = "marketing"

urlpatterns = [
    path("landing-page/", LandingPageAPIView.as_view(), name="landing-page"),
    path("contact-us/", ContactUsAPIView.as_view(), name="contact-us"),
]
