import { useQuery } from "@tanstack/react-query";
import { getFlights } from "../api";

export const useFlights = () => {
  return useQuery({
    queryKey: ["flights"],
    queryFn: getFlights,
  });
};
