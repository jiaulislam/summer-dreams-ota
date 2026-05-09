import { useTranslations } from "next-intl";
import { Navbar } from "@/features/marketing/components/navbar";
import { Footer } from "@/features/marketing/components/footer";
import { FloatingChatWidget } from "@/features/marketing/components/floating-chat-widget";
// import { ContactForm } from "@/features/marketing/components/contact-form";
// import { ContactInfo } from "@/features/marketing/components/contact-info";

export default function ContactPage() {
  const t = useTranslations("Contact");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-gray-600">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
               {/* <ContactForm /> */}
               <div className="h-96 flex items-center justify-center text-gray-400 italic">
                 Contact Form placeholder...
               </div>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-8">
               {/* <ContactInfo /> */}
               <div className="h-96 flex items-center justify-center text-gray-400 italic">
                 Contact Info & WhatsApp placeholder...
               </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingChatWidget />
    </div>
  );
}
