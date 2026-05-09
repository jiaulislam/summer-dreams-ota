from rest_framework import status
from rest_framework.test import APITestCase

from django.core import mail
from django.urls import reverse

from summer_dreams_ota.marketing.models import AgencySetting, ContactInquiry


class ContactUsTests(APITestCase):
    def setUp(self):
        self.url = reverse("v1:marketing:contact-us")
        self.valid_payload = {
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "123456789",
            "message": "Hello, I am interested in your services.",
        }

    def test_contact_us_success(self):
        # Setup AgencySetting to test custom recipient
        AgencySetting.objects.create(address="Test Address", phone="12345", email="support@summerdreams.com")

        response = self.client.post(self.url, self.valid_payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["success"], True)
        self.assertEqual(response.data["message"], "Your message has been sent successfully!")

        # Verify DB
        self.assertEqual(ContactInquiry.objects.count(), 1)
        inquiry = ContactInquiry.objects.first()
        self.assertEqual(inquiry.name, "John Doe")

        # Verify Email
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, "New Contact Inquiry from John Doe")
        self.assertEqual(mail.outbox[0].to, ["support@summerdreams.com"])
        self.assertIn("Name: John Doe", mail.outbox[0].body)
        self.assertIn("Message:\nHello, I am interested in your services.", mail.outbox[0].body)

    def test_contact_us_validation_error(self):
        invalid_payload = {"name": "", "email": "not-an-email", "message": ""}
        response = self.client.post(self.url, invalid_payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # Verify no DB record
        self.assertEqual(ContactInquiry.objects.count(), 0)
        # Verify no email
        self.assertEqual(len(mail.outbox), 0)

    def test_contact_us_optional_phone(self):
        payload = self.valid_payload.copy()
        del payload["phone"]

        response = self.client.post(self.url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactInquiry.objects.first().phone, "")
