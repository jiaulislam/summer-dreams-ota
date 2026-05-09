import random
from decimal import Decimal

from django.core.management.base import BaseCommand

from summer_dreams_ota.marketing.models import PopularDestination, TourPackage


class Command(BaseCommand):
    help = "Seed TourPackage and PopularDestination models with 30 items each."

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Clear existing data before seeding",
        )

    def handle(self, *args, **options):
        if options["clear"]:
            self.stdout.write("Clearing existing data...")
            TourPackage.objects.all().delete()
            PopularDestination.objects.all().delete()

        self.seed_tour_packages()
        self.seed_popular_destinations()

        self.stdout.write(self.style.SUCCESS("Successfully seeded marketing data."))

    def seed_tour_packages(self):
        self.stdout.write("Seeding Tour Packages...")

        tour_names = [
            "Alpine Adventure",
            "Amalfi Coast Drive",
            "Balinese Bliss",
            "Bangkok Street Food",
            "Barcelona Tapas Tour",
            "Cairo Antiquities",
            "Cape Town Safari",
            "Dubai Luxury Getaway",
            "Grand Canyon Explorer",
            "Great Wall Hike",
            "Havana Classic Cars",
            "Icelandic Aurora",
            "Istanbul Bazaar",
            "Kyoto Temple Stay",
            "Lisbon Coastline",
            "London Royal Heritage",
            "Machu Picchu Trek",
            "Marrakesh Souks",
            "New York City Escape",
            "Parisian Romance",
            "Petra Rose City",
            "Prague Fairy Tale",
            "Rio Carnival",
            "Rome Eternal City",
            "Safari Dreams",
            "Santorini Sunsets",
            "Swiss Alps Skiing",
            "Sydney Harbour Wonders",
            "Tokyo Lights",
            "Venice Canal Cruise",
        ]

        images = [
            "tours/alpine_adventure.jpg",
            "tours/amalfi_coast_drive.jpg",
            "tours/balinese_bliss.jpg",
            "tours/bangkok_street_food.jpg",
            "tours/barcelona_tapas_tour.jpg",
            "tours/cairo_antiquities.jpg",
            "tours/cape_town_safari.jpg",
            "tours/dubai_luxury_getaway.jpg",
            "tours/grand_canyon_explorer.jpg",
            "tours/great_wall_hike.jpg",
            "tours/havana_classic_cars.jpg",
            "tours/icelandic_aurora.jpg",
            "tours/istanbul_bazaar.jpg",
            "tours/kyoto_temple_stay.jpg",
            "tours/lisbon_coastline.jpg",
            "tours/london_royal_heritage.jpg",
            "tours/machu_picchu_trek.jpg",
            "tours/marrakesh_souks.jpg",
            "tours/new_york_city_escape.jpg",
            "tours/parisian_romance.jpg",
            "tours/petra_rose_city.jpg",
            "tours/prague_fairy_tale.jpg",
            "tours/rio_carnival.jpg",
            "tours/rome_eternal_city.jpg",
            "tours/safari_dreams.jpg",
            "tours/santorini_sunsets.jpg",
            "tours/swiss_alps_skiing.jpg",
            "tours/sydney_harbour_wonders.jpg",
            "tours/tokyo_lights.jpg",
            "tours/venice_canal_cruise.jpg",
        ]

        for i, name in enumerate(tour_names):
            TourPackage.objects.language("en").create(
                name=name,
                price=Decimal(random.randint(500, 5000)),
                image=images[i % len(images)],
                is_active=random.choice([True, True, True, False]),  # 75% chance active
                order_index=i + 1,
            )

    def seed_popular_destinations(self):
        self.stdout.write("Seeding Popular Destinations...")

        destination_data = [
            ("Paris", "The City of Light and Love, home to the Eiffel Tower."),
            ("Tokyo", "A bustling metropolis blending tradition and futuristic tech."),
            ("New York", "The city that never sleeps, known for Broadway and Central Park."),
            ("Cape Town", "A stunning coastal city at the foot of Table Mountain."),
            ("Rome", "The Eternal City, rich in history, culture, and ancient ruins."),
            ("London", "A global capital known for its history, museums, and iconic landmarks."),
            ("Barcelona", "Famous for its unique architecture, beaches, and vibrant culture."),
            ("Sydney", "Home to the Opera House and beautiful Bondi Beach."),
            ("Dubai", "Luxury shopping, ultramodern architecture, and a lively nightlife."),
            ("Kyoto", "The heart of traditional Japan, filled with temples and gardens."),
            ("Santorini", "Famous for its whitewashed houses and stunning sunsets."),
            ("Rio de Janeiro", "Known for its Carnival festival and Christ the Redeemer."),
            ("Marrakesh", "A former imperial city in western Morocco with colorful souks."),
            ("Cairo", "Home to the iconic Giza Pyramids and Great Sphinx."),
            ("Prague", "The City of a Hundred Spires, known for its Old Town Square."),
            ("Istanbul", "A major city in Turkey that straddles Europe and Asia."),
            ("Lisbon", "The hilly, coastal capital city of Portugal."),
            ("Bangkok", "Known for ornate shrines and vibrant street life."),
            ("Venice", "The city of canals, known for its Gothic palaces."),
            ("Amsterdam", "Known for its artistic heritage and elaborate canal system."),
            ("Machu Picchu", "An Incan citadel set high in the Andes Mountains in Peru."),
            ("Petra", "Famous archaeological site in Jordan's southwestern desert."),
            ("Bali", "An Indonesian island known for its forested volcanic mountains."),
            ("Havana", "Cuba's capital, known for 16th-century Spanish colonial architecture."),
            ("Grand Canyon", "Arizona's natural wonder with immense size and colorful landscape."),
            ("Great Wall", "An ancient series of walls and fortifications in northern China."),
            ("Amalfi Coast", "A 50-kilometer stretch of coastline along the southern edge of Italy."),
            ("Swiss Alps", "Dramatic mountain range known for skiing and hiking."),
            ("Iceland", "Nordic island nation with a dramatic landscape with volcanoes and geysers."),
            ("Dubrovnik", "A city in southern Croatia fronting the Adriatic Sea."),
        ]

        images = [
            "destinations/paris.webp",
            "destinations/tokyo.webp",
            "destinations/Newyork.webp",
            "destinations/capetown.webp",
        ]

        for i, (name, description) in enumerate(destination_data):
            PopularDestination.objects.language("en").create(
                name=name,
                description=description,
                image=images[i % len(images)],
                is_active=random.choice([True, True, True, False]),  # 75% chance active
                order_index=i + 1,
            )
