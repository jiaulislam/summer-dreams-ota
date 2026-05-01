"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8 text-center">
      <div className="flex flex-col items-center space-y-4">
        {session?.user?.image && (
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-primary/20 shadow-md">
            <Image
              src={session.user.image}
              alt={session.user.name || "User Avatar"}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-gray-900">Welcome back, {session?.user?.name || "Traveler"}!</h1>
          <p className="text-xl text-gray-600 italic">Protected: Dashboard Route Working</p>
        </div>
      </div>

      <div className="w-full max-w-md p-6 border rounded-2xl shadow-sm bg-white space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2 text-gray-800">Profile Information</h2>
        <div className="space-y-3 text-left">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Full Name</span>
            <span className="text-gray-700 font-medium">{session?.user?.name || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Email Address</span>
            <span className="text-gray-700 font-medium">{session?.user?.email || "N/A"}</span>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        size="lg"
        className="rounded-full px-8 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
        onClick={() => signOut({ redirectTo: "/login" })}
      >
        Sign Out
      </Button>
    </div>
  );
}
