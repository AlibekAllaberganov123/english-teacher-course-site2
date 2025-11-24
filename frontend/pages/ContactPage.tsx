import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 rounded-full mb-6">
            <MapPin className="w-5 h-5 text-sky-600" />
            <span className="text-sm font-medium text-sky-900">{t("getInTouch", "Get In Touch")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            {t("contactTitle", "Start Your Journey")}
            <span className="block mt-2 text-sky-600">{t("contactTitleHighlight", "Today")}</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t("contactSubtitle", "Get in touch to book a free consultation or ask any questions")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactInfo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
