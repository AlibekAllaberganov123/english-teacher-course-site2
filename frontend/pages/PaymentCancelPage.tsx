import { motion } from "framer-motion";
import { XCircle, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

export function PaymentCancelPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full"
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 bg-orange-100 dark:bg-orange-950 rounded-full flex items-center justify-center"
          >
            <XCircle className="w-14 h-14 text-orange-600 dark:text-orange-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
          >
            {language === "uz" ? "To'lov bekor qilindi" : "Payment Cancelled"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-600 dark:text-slate-400 mb-8"
          >
            {language === "uz"
              ? "To'lov jarayoni bekor qilindi. Xavotir olmang, hech qanday to'lov olinmadi."
              : "Payment process was cancelled. Don't worry, no payment was taken."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 mb-8"
          >
            <p className="text-slate-700 dark:text-slate-300">
              {language === "uz"
                ? "Agar muammo yuz bergan bo'lsa, biz bilan bog'laning yoki keyinroq qayta urinib ko'ring."
                : "If you encountered any issues, please contact us or try again later."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="flex-1 gap-2"
              onClick={() => navigate("/courses")}
            >
              <ArrowLeft className="w-5 h-5" />
              {language === "uz" ? "Kurslarga qaytish" : "Back to Courses"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => navigate("/")}
            >
              <Home className="w-5 h-5" />
              {language === "uz" ? "Bosh sahifa" : "Home"}
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm text-slate-500 dark:text-slate-400 mt-6"
          >
            {language === "uz"
              ? "Yordam kerakmi? WhatsApp orqali murojaat qiling: +998 90 123 45 67"
              : "Need help? Contact us on WhatsApp: +998 90 123 45 67"}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
