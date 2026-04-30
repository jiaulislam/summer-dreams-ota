from django.urls import path

from summer_dreams_ota.authentication.views import GoogleLoginView, LoginView, SignupView

app_name = "authentication"

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("signup/", SignupView.as_view(), name="signup"),
    path("google/", GoogleLoginView.as_view(), name="google_login"),
]
