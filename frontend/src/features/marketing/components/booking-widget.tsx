"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, CreditCard, Palmtree } from "lucide-react";

export function BookingWidget() {
  const t = useTranslations("Hero");

  return (
    <Card className="w-full max-w-5xl bg-white shadow-2xl border-none rounded-2xl overflow-visible">
      <CardContent className="p-0">
        <Tabs defaultValue="flight" className="w-full">
          <TabsList className="w-full h-auto p-0 bg-gray-50/50 border-b rounded-t-2xl grid grid-cols-3">
            <TabsTrigger
              value="flight"
              className="py-4 data-[state=active]:bg-white data-[state=active]:text-brand-primary rounded-tl-2xl flex items-center space-x-2"
            >
              <Plane size={20} />
              <span className="font-semibold">{t("flight")}</span>
            </TabsTrigger>
            <TabsTrigger
              value="visa"
              className="py-4 data-[state=active]:bg-white data-[state=active]:text-brand-primary flex items-center space-x-2"
            >
              <CreditCard size={20} />
              <span className="font-semibold">{t("visa")}</span>
            </TabsTrigger>
            <TabsTrigger
              value="holiday"
              className="py-4 data-[state=active]:bg-white data-[state=active]:text-brand-primary rounded-tr-2xl flex items-center space-x-2"
            >
              <Palmtree size={20} />
              <span className="font-semibold">{t("holiday")}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="flight" className="p-6 md:p-8 min-h-[160px] flex items-center justify-center italic text-gray-400">
            Flight services coming soon...
          </TabsContent>

          <TabsContent value="visa" className="p-6 md:p-8 min-h-[160px] flex items-center justify-center italic text-gray-400">
            Visa services coming soon...
          </TabsContent>

          <TabsContent value="holiday" className="p-6 md:p-8 min-h-[160px] flex items-center justify-center italic text-gray-400">
            Holiday packages coming soon...
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
