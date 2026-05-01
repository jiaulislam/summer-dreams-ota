import NextAuth, { User as NextAuthUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { User } from "@/types";
import { API_URL } from "@/lib/constants";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(`${API_URL}/auth/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) return null;

          const data = await res.json();
          return {
            id: data.id || data.user?.id,
            name: data.name || data.user?.name,
            email: data.email || data.user?.email,
            accessToken: data.access || data.accessToken,
            refreshToken: data.refresh || data.refreshToken,
          } as User & NextAuthUser;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "google") {
        try {
          // Exchange Google Token for Django Token
          const res = await fetch(`${API_URL}/auth/google/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              access_token: account.access_token,
              id_token: account.id_token,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            // Attach backend tokens to the user object for the JWT callback
            const u = user as User;
            u.accessToken = data.access;
            u.refreshToken = data.refresh;
            return true;
          }
          return false;
        } catch (error) {
          console.error("Google login backend exchange failed:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const u = user as unknown as User;
        return {
          ...token,
          accessToken: u.accessToken,
          refreshToken: u.refreshToken,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
});
