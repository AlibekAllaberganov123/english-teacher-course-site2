import { motion } from "framer-motion";
import { Download, Video, FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export function ResourcesPage() {
  const { t } = useLanguage();

  const resources = [
    {
      type: "pdf",
      icon: FileText,
      title: "IELTS Vocabulary Guide",
      titleUz: "IELTS So'z Boyligi Qo'llanmasi",
      description: "Essential vocabulary for IELTS success",
      descriptionUz: "IELTS muvaffaqiyati uchun muhim so'z boyligi",
      downloadUrl: "#"
    },
    {
      type: "pdf",
      icon: FileText,
      title: "Grammar Tips & Tricks",
      titleUz: "Grammatika Maslahatlari",
      description: "Common grammar mistakes and how to avoid them",
      descriptionUz: "Keng tarqalgan grammatika xatolari va ulardan qanday qochish",
      downloadUrl: "#"
    },
    {
      type: "pdf",
      icon: FileText,
      title: "Speaking Topics Collection",
      titleUz: "Speaking Mavzular To'plami",
      description: "100+ speaking topics with sample answers",
      descriptionUz: "100+ speaking mavzular namuna javoblar bilan",
      downloadUrl: "#"
    },
    {
      type: "pdf",
      icon: FileText,
      title: "Writing Task 2 Templates",
      titleUz: "Writing Task 2 Shablonlari",
      description: "Effective templates for all essay types",
      descriptionUz: "Barcha insho turlari uchun samarali shablonlar",
      downloadUrl: "#"
    }
  ];

  const videos = [
    {
      title: "IELTS Speaking Part 1 - Tips & Strategies",
      titleUz: "IELTS Speaking Part 1 - Maslahatlar va Strategiyalar",
      embedId: "dQw4w9WgXcQ"
    },
    {
      title: "How to Improve Your English Pronunciation",
      titleUz: "Ingliz Tili Talaffuzini Qanday Yaxshilash",
      embedId: "dQw4w9WgXcQ"
    },
    {
      title: "IELTS Writing Task 2 - Step by Step Guide",
      titleUz: "IELTS Writing Task 2 - Qadam-baqadam Qo'llanma",
      embedId: "dQw4w9WgXcQ"
    }
  ];

  const weeklyPrompts = [
    {
      week: "Week 1",
      topic: "Describe a memorable journey you have taken",
      topicUz: "O'zingiz qilgan unutilmas sayohat haqida gapiring"
    },
    {
      week: "Week 2",
      topic: "Talk about a skill you would like to learn",
      topicUz: "O'rganmoqchi bo'lgan ko'nikma haqida gapiring"
    },
    {
      week: "Week 3",
      topic: "Describe a book that influenced you",
      topicUz: "Sizga ta'sir qilgan kitob haqida gapiring"
    },
    {
      week: "Week 4",
      topic: "Talk about a challenge you overcame",
      topicUz: "Yenggan qiyinchilik haqida gapiring"
    }
  ];

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
            <span className="text-sm font-medium text-sky-900">{t("freeResources", "Free Resources")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            {t("resourcesTitle", "Learn & Practice")}
            <span className="block mt-2 text-sky-600">{t("resourcesTitleHighlight", "For Free")}</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t("resourcesSubtitle", "Download free materials and watch educational videos to improve your English")}
          </p>
        </motion.div>

        <div className="space-y-16">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8">{t("downloadableMaterials", "Downloadable Materials")}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:border-sky-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <resource.icon className="w-6 h-6 text-sky-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1">{resource.titleUz}</h3>
                      <p className="text-sm text-slate-600 mb-4">{resource.descriptionUz}</p>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        {t("download", "Download")}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8">{t("videoLessons", "Video Lessons")}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <div key={index} className="bg-slate-50 rounded-xl overflow-hidden">
                  <div className="aspect-video bg-slate-200 flex items-center justify-center">
                    <Video className="w-12 h-12 text-slate-400" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900">{video.titleUz}</h3>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-50 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8">{t("weeklySpeakingPrompts", "Weekly Speaking Prompts")}</h2>
            <div className="space-y-4">
              {weeklyPrompts.map((prompt, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
                      {prompt.week}
                    </div>
                    <p className="text-slate-900 flex-1">{prompt.topicUz}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
