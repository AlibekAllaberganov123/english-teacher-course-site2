import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, BookOpen, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

export function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const courseName = searchParams.get("course") || "Kurs";

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-sky-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-14 h-14 text-green-600 dark:text-green-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            {language === "uz" ? "Tabriklaymiz! 🎉" : "Congratulations! 🎉"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-600 dark:text-slate-400 mb-8"
          >
            {language === "uz"
              ? "To'lov muvaffaqiyatli amalga oshirildi!"
              : "Payment completed successfully!"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <BookOpen className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {courseName}
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              {language === "uz"
                ? "Siz muvaffaqiyatli kursga yozildingiz!"
                : "You have successfully enrolled in the course!"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-start gap-3 text-left bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
              <div className="w-8 h-8 bg-sky-100 dark:bg-sky-950 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sky-600 dark:text-sky-400 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {language === "uz" ? "Dashboard'ga o'ting" : "Go to Dashboard"}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {language === "uz"
                    ? "Barcha kurs materiallari va video darslar sizni kutmoqda"
                    : "All course materials and video lessons are waiting for you"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
              <div className="w-8 h-8 bg-sky-100 dark:bg-sky-950 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sky-600 dark:text-sky-400 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {language === "uz" ? "Darslarni boshlang" : "Start Learning"}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {language === "uz"
                    ? "Video darslarni tomosha qiling va uy vazifalarni bajaring"
                    : "Watch video lessons and complete homework"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
              <div className="w-8 h-8 bg-sky-100 dark:bg-sky-950 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sky-600 dark:text-sky-400 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {language === "uz" ? "Progressni kuzating" : "Track Progress"}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {language === "uz"
                    ? "O'z natijalaringizni real vaqtda kuzatib boring"
                    : "Track your results in real time"}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="flex-1 gap-2"
              onClick={() => navigate("/dashboard")}
            >
              <Play className="w-5 h-5" />
              {language === "uz" ? "Dashboard'ga o'tish" : "Go to Dashboard"}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/courses")}
            >
              {language === "uz" ? "Boshqa kurslar" : "Other Courses"}
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-slate-500 dark:text-slate-400 mt-6"
          >
            {language === "uz"
              ? "5 soniyadan so'ng avtomatik dashboard'ga yo'naltirilasiz..."
              : "You will be redirected to dashboard in 5 seconds..."}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
