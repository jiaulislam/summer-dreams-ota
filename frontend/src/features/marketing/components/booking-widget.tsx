"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plane, CreditCard, Palmtree, Search } from "lucide-react";

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

          <TabsContent value="flight" className="p-6 md:p-8 space-y-6">
            <RadioGroup defaultValue="round-trip" className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one-way" id="one-way" />
                <Label htmlFor="one-way" className="font-medium cursor-pointer">{t("oneWay")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="round-trip" id="round-trip" />
                <Label htmlFor="round-trip" className="font-medium cursor-pointer">{t("roundTrip")}</Label>
              </div>
            </RadioGroup>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-500 text-xs uppercase font-bold tracking-wider">{t("from")}</Label>
                <Input placeholder="Select Origin" className="h-12 bg-gray-50 border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-500 text-xs uppercase font-bold tracking-wider">{t("to")}</Label>
                <Input placeholder="Select Destination" className="h-12 bg-gray-50 border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-500 text-xs uppercase font-bold tracking-wider">{t("date")}</Label>
                <Input type="date" className="h-12 bg-gray-50 border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-500 text-xs uppercase font-bold tracking-wider">{t("passengers")}</Label>
                <Input type="number" placeholder="1 Passenger" className="h-12 bg-gray-50 border-gray-200" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="visa" className="p-6 md:p-8 min-h-[160px] flex items-center justify-center italic text-gray-400">
            Visa services coming soon...
          </TabsContent>

          <TabsContent value="holiday" className="p-6 md:p-8 min-h-[160px] flex items-center justify-center italic text-gray-400">
            Holiday packages coming soon...
          </TabsContent>
        </Tabs>

        {/* Bridged Search Button */}
        <div className="absolute left-1/2 -bottom-6 -translate-x-1/2">
          <Button
            size="lg"
            className="h-12 px-12 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white shadow-xl shadow-brand-primary/20 flex items-center space-x-2"
          >
            <Search size={20} />
            <span className="font-bold uppercase tracking-wider">{t("search")}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
