export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  price: number;
  currency: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}
