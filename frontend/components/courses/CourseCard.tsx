import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CourseModal } from "./CourseModal";
import { ScheduleModal } from "./ScheduleModal";
import type { Course } from "~backend/courses/list";
import { useLanguage } from "@/hooks/useLanguage";

interface CourseCardProps {
  course: Course;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const { language } = useLanguage();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm";
  };

  const title = language === "uz" ? course.titleUz : course.title;
  const description = language === "uz" ? course.descriptionUz : course.description;
  const features = language === "uz" ? course.featuresUz : course.features;

  const getSchedule = (category: string) => {
    const schedules: Record<string, Array<{ day: string; time: string }>> = {
      "IELTS": [
        { day: "Dushanba", time: "19:00 - 21:00" },
        { day: "Chorshanba", time: "19:00 - 21:00" },
        { day: "Juma", time: "19:00 - 21:00" },
      ],
      "General English": [
        { day: "Seshanba", time: "18:00 - 20:00" },
        { day: "Payshanba", time: "18:00 - 20:00" },
      ],
      "Speaking Club": [
        { day: "Shanba", time: "16:00 - 18:00" },
      ],
      "Business English": [
        { day: "Dushanba", time: "20:00 - 22:00" },
        { day: "Juma", time: "20:00 - 22:00" },
      ],
      "Kids English": [
        { day: "Seshanba", time: "16:00 - 17:30" },
        { day: "Payshanba", time: "16:00 - 17:30" },
        { day: "Shanba", time: "14:00 - 15:30" },
      ],
    };
    return schedules[category] || [];
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-200 dark:border-slate-800"
      >
        <div className="aspect-[16/10] bg-gradient-to-br from-sky-100 to-blue-100 overflow-hidden">
          <img
            src={course.image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250'%3E%3Crect fill='%23E0F2FE' width='400' height='250'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%230F172A' font-size='18' font-family='Arial'%3E${course.category}%3C/text%3E%3C/svg%3E`;
            }}
          />
        </div>

        <div className="p-6">
          <div className="inline-block px-3 py-1 bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-400 text-xs font-medium rounded-full mb-3">
            {course.category}
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">{description}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span className="capitalize">{course.format}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Start: {new Date(course.startDate).toLocaleDateString("uz-UZ")}</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsScheduleOpen(true)}
            className="w-full mb-4 gap-2"
          >
            <CalendarDays className="w-4 h-4" />
            Dars jadvali
          </Button>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{formatPrice(course.price)}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">per course</div>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="gap-2">
              Xarid qilish
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      <CourseModal
        course={course}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        courseTitle={title}
        schedule={getSchedule(course.category)}
      />
    </>
  );
}
