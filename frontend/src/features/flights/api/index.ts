"use server";

import { Flight } from "@/types";

export const getFlights = async (): Promise<Flight[]> => {
  // Since flights are public, we use requireAuth: false
  // return apiClient("/flights/", { requireAuth: false });

  // Mocking for now to show functionality
  return [
    { id: "1", airline: "LATAM", flightNumber: "LA123", departure: "LIM", arrival: "CUZ", price: 120, currency: "USD" },
    { id: "2", airline: "Sky Airline", flightNumber: "H2456", departure: "LIM", arrival: "CUZ", price: 95, currency: "USD" },
  ];
};
