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

export interface LandingPageData {
  hero: {
    title: string;
    subtitle: string;
    background_image: string;
  };
  tours: Array<{
    name: string;
    price: string;
    image: string;
    is_active: boolean;
    order_index: number;
  }>;
  destinations: Array<{
    name: string;
    description: string;
    image: string;
    is_active: boolean;
    order_index: number;
  }>;
  why_choose_us: {
    section_title: string;
    featured_image: string;
    items: Array<{
      icon_slug: string;
      title: string;
      description: string;
      order_index: number;
    }>;
  };
  agency: {
    address: string;
    phone: string;
    email: string;
    facebook_url: string;
    instagram_url: string;
    linkedin_url: string;
  };
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
