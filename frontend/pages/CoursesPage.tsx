import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import backend from "~backend/client";
import { CourseCard } from "@/components/courses/CourseCard";
import { BookOpen, Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export function CoursesPage() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => backend.courses.list(),
  });

  useEffect(() => {
    if (searchParams.has("selectedCourse")) {
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

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
            <BookOpen className="w-5 h-5 text-sky-600" />
            <span className="text-sm font-medium text-sky-900">{t("coursesAvailable", "Available Courses")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            {t("coursesTitle", "Choose Your Path to")}
            <span className="block mt-2 text-sky-600">{t("coursesTitleHighlight", "English Mastery")}</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t("coursesSubtitle", "Professional courses designed to help you achieve your English language goals")}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
