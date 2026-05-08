import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plane,
  CreditCard,
  Palmtree
} from "lucide-react";
import { cn } from "@/lib/utils";

export function BookingWidget() {
  const t = useTranslations("Hero");

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="bg-white/90 backdrop-blur-xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border-none rounded-[40px] overflow-visible">
        <CardContent className="p-0">
          <Tabs defaultValue="flight" className="w-full">
            {/* Centered Tabs Navigation */}
            <div className="flex justify-center -translate-y-1/2 absolute top-0 left-0 right-0 z-10">
              <TabsList className="h-16 bg-white shadow-xl border border-gray-100/50 rounded-2xl p-1 gap-1">
                <TabsTrigger
                  value="flight"
                  className="px-8 h-full data-[state=active]:bg-brand-primary data-[state=active]:text-white rounded-xl transition-all duration-300 gap-2"
                >
                  <Plane size={20} className={cn("transition-transform duration-300")} />
                  <span className="font-bold tracking-tight">{t("flight")}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="visa"
                  className="px-8 h-full data-[state=active]:bg-brand-primary data-[state=active]:text-white rounded-xl transition-all duration-300 gap-2"
                >
                  <CreditCard size={20} />
                  <span className="font-bold tracking-tight">{t("visa")}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="holiday"
                  className="px-8 h-full data-[state=active]:bg-brand-primary data-[state=active]:text-white rounded-xl transition-all duration-300 gap-2"
                >
                  <Palmtree size={20} />
                  <span className="font-bold tracking-tight">{t("holiday")}</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="flight" className="p-8 pt-16 md:pt-16 mt-0 min-h-[300px] flex flex-col items-center justify-center space-y-4">
                <div className="h-20 w-20 rounded-3xl bg-gray-50 flex items-center justify-center text-brand-primary mb-2">
                    <Plane size={40} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Flight Bookings</h3>
                <p className="text-gray-500 font-medium text-center max-w-sm italic">
                  Search and book flights to your favorite destinations. Our flight booking engine is currently under development.
                </p>
            </TabsContent>

            <TabsContent value="visa" className="p-8 pt-16 md:pt-16 mt-0 min-h-[300px] flex flex-col items-center justify-center space-y-4">
                <div className="h-20 w-20 rounded-3xl bg-gray-50 flex items-center justify-center text-brand-primary mb-2">
                    <CreditCard size={40} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Visa Services</h3>
                <p className="text-gray-500 font-medium text-center max-w-sm italic">
                  Apply for your travel visa with ease. Our streamlined process is currently under development.
                </p>
            </TabsContent>

            <TabsContent value="holiday" className="p-8 pt-16 md:pt-16 mt-0 min-h-[300px] flex flex-col items-center justify-center space-y-4">
                <div className="h-20 w-20 rounded-3xl bg-gray-50 flex items-center justify-center text-brand-primary mb-2">
                    <Palmtree size={40} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Holiday Packages</h3>
                <p className="text-gray-500 font-medium text-center max-w-sm italic">
                  Discover curated holiday experiences. Stay tuned for our exclusive packages launching soon.
                </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
