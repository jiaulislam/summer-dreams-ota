import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plane,
  CreditCard,
  Palmtree,
  ArrowLeftRight,
  Calendar as CalendarIcon,
  Users,
  Search
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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

            <TabsContent value="flight" className="p-8 md:p-12 pt-16 md:pt-16 mt-0">
              <div className="space-y-8">
                {/* Trip Type Selection */}
                <RadioGroup defaultValue="round-trip" className="flex flex-wrap gap-6">
                  <div className="flex items-center space-x-2 cursor-pointer group">
                    <RadioGroupItem value="one-way" id="one-way" className="border-gray-300 text-brand-primary focus-visible:ring-brand-primary" />
                    <Label htmlFor="one-way" className="font-bold text-gray-600 cursor-pointer group-hover:text-brand-primary transition-colors uppercase tracking-wider text-xs">One Way</Label>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer group">
                    <RadioGroupItem value="round-trip" id="round-trip" className="border-gray-300 text-brand-primary focus-visible:ring-brand-primary" />
                    <Label htmlFor="round-trip" className="font-bold text-gray-900 cursor-pointer group-hover:text-brand-primary transition-colors uppercase tracking-wider text-xs">Round Trip</Label>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer group">
                    <RadioGroupItem value="multi-city" id="multi-city" className="border-gray-300 text-brand-primary focus-visible:ring-brand-primary" />
                    <Label htmlFor="multi-city" className="font-bold text-gray-600 cursor-pointer group-hover:text-brand-primary transition-colors uppercase tracking-wider text-xs">Multi City</Label>
                  </div>
                </RadioGroup>

                {/* Main Input Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 border border-gray-100 rounded-[24px] overflow-hidden shadow-sm bg-white">
                  {/* From */}
                  <div className="p-5 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 mb-1 group-hover:text-brand-primary transition-colors">From</p>
                    <h4 className="text-xl font-black text-gray-900">Dhaka</h4>
                    <p className="text-xs text-gray-500 font-medium truncate">Hazrat Shahjalal Intl (DAC)</p>
                  </div>

                  {/* Swap Icon Wrapper */}
                  <div className="relative">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 z-20 hidden lg:block">
                        <div className="h-10 w-10 bg-white border border-gray-100 shadow-lg rounded-full flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 cursor-pointer">
                            <ArrowLeftRight size={18} />
                        </div>
                    </div>
                    {/* To */}
                    <div className="p-5 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group h-full">
                        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 mb-1 group-hover:text-brand-primary transition-colors">To</p>
                        <h4 className="text-xl font-black text-gray-900">Cox&apos;s Bazar</h4>
                        <p className="text-xs text-gray-500 font-medium truncate">Cox&apos;s Bazar Airport (CXB)</p>
                    </div>
                  </div>

                  {/* Departure */}
                  <div className="p-5 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 mb-1 group-hover:text-brand-primary transition-colors">Departure</p>
                    <div className="flex items-baseline space-x-1">
                        <h4 className="text-xl font-black text-gray-900">15 May</h4>
                        <span className="text-xs font-bold text-gray-500">&apos;26</span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">Friday</p>
                  </div>

                  {/* Return */}
                  <div className="p-5 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 mb-1 group-hover:text-brand-primary transition-colors">Return</p>
                    <div className="flex items-baseline space-x-1">
                        <h4 className="text-xl font-black text-gray-900">22 May</h4>
                        <span className="text-xs font-bold text-gray-500">&apos;26</span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">Friday</p>
                  </div>

                  {/* Passenger & Class */}
                  <div className="p-5 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 mb-1 group-hover:text-brand-primary transition-colors">Travelers & Class</p>
                    <h4 className="text-xl font-black text-gray-900">1 Adult</h4>
                    <p className="text-xs text-gray-500 font-medium">Economy Class</p>
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                    <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center text-gray-500 hover:text-brand-primary transition-colors cursor-pointer font-bold">
                            <span className="mr-2 h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
                            Special Fares Available
                        </div>
                    </div>
                    <Button className="w-full md:w-auto px-12 h-16 rounded-2xl bg-brand-primary hover:bg-brand-primary/90 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-primary/20 transition-all hover:-translate-y-1 active:scale-95">
                        <Search className="mr-3 h-5 w-5" />
                        Search Flights
                    </Button>
                </div>
              </div>
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
