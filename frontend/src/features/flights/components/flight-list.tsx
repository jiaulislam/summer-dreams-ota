"use client";

import { useFlights } from "../hooks/use-flights";
import { Button } from "@/components/ui/button";

import { useTranslations } from "next-intl";

export function FlightList() {
  const t = useTranslations("Flights");
  const { data: flights, isLoading, error } = useFlights();

  if (isLoading) return <div>{t("loading")}</div>;
  if (error) return <div>{t("error")}</div>;

  return (
    <div className="space-y-4 w-full max-w-2xl">
      <h2 className="text-2xl font-semibold">{t("title")}</h2>
      <div className="grid gap-4">
        {flights?.map((flight) => (
          <div key={flight.id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <p className="font-bold text-lg">{flight.airline} - {flight.flightNumber}</p>
              <p className="text-gray-600">{flight.departure} → {flight.arrival}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">${flight.price}</p>
              <Button size="sm">{t("select")}</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
