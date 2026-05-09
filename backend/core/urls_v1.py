from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from django.urls import include, path

app_name = "v1"

urlpatterns = [
    path("auth/", include("summer_dreams_ota.authentication.urls")),
    path("auth/", include("dj_rest_auth.urls")),
    path("telegram/", include("summer_dreams_ota.telegram.urls")),
    # Schema and Docs
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "docs/",
        SpectacularSwaggerView.as_view(url_name="v1:schema"),
        name="swagger-ui",
    ),
    path(
        "redoc/",
        SpectacularRedocView.as_view(url_name="v1:schema"),
        name="redoc",
    ),
]
