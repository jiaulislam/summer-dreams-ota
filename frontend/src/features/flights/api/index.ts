import { apiClient } from "@/lib/api-client";
import { Flight } from "@/types";

export const getFlights = async (): Promise<Flight[]> => {
  // In a real app, this calls the Django backend
  // return apiClient("/flights/");

  // Mocking for now to show functionality
  return [
    { id: "1", airline: "LATAM", flightNumber: "LA123", departure: "LIM", arrival: "CUZ", price: 120, currency: "USD" },
    { id: "2", airline: "Sky Airline", flightNumber: "H2456", departure: "LIM", arrival: "CUZ", price: 95, currency: "USD" },
  ];
};
