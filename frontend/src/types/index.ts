import "next-auth";
import "next-auth/jwt";

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
  image?: string | null;
  accessToken: string;
  refreshToken: string;
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: User & {
      id: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
}
