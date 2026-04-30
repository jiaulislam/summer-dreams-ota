"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      <h1 className="text-3xl font-bold">Protected: Dashboard Route Working</h1>

      <div className="w-full max-w-2xl p-6 border rounded-lg bg-gray-50 space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Session Debug Info</h2>
        <div className="space-y-2">
          <p><strong>User:</strong> {session?.user?.name} ({session?.user?.email})</p>
          <div className="space-y-1">
            <p><strong>Access Token:</strong></p>
            <pre className="p-2 bg-gray-800 text-white rounded text-xs overflow-auto max-h-32 whitespace-pre-wrap break-all">
              {session?.accessToken || "None"}
            </pre>
          </div>
          <div className="space-y-1">
            <p><strong>Refresh Token:</strong></p>
            <pre className="p-2 bg-gray-800 text-white rounded text-xs overflow-auto max-h-32 whitespace-pre-wrap break-all">
              {session?.refreshToken || "None"}
            </pre>
          </div>
        </div>
      </div>

      <Button onClick={() => signOut({ callbackUrl: "/login" })}>Sign Out</Button>
    </div>
  );
}
