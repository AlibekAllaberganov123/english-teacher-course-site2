import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Clock, PlayCircle, FileText, Send } from "lucide-react";
import { useBackend } from "@/hooks/useBackend";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";

export function DashboardPage() {
  const backend = useBackend();
  const { toast } = useToast();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [homeworkContent, setHomeworkContent] = useState<Record<number, string>>({});

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => backend.student.getDashboard(),
  });

  const submitMutation = useMutation({
    mutationFn: (req: { homeworkId: number; content: string }) =>
      backend.student.submitHomework(req),
    onSuccess: () => {
      toast({
        title: "Muvaffaqiyatli!",
        description: "Uy vazifangiz yuborildi.",
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      setHomeworkContent({});
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Xatolik",
        description: "Uy vazifani yuborishda xatolik yuz berdi.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  const progress = data?.progress || { completedVideos: 0, totalVideos: 0, completedHomework: 0, totalHomework: 0, percentage: 0 };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Shaxsiy kabinet
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Xush kelibsiz, {user?.firstName || "O'quvchi"}!
            </p>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-sky-100 dark:bg-sky-950 rounded-lg flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {progress.completedVideos}/{progress.totalVideos}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Video darslar</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {progress.completedHomework}/{progress.totalHomework}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Uy vazifalari</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl p-6 shadow-lg"
          >
            <div className="text-white">
              <div className="text-5xl font-bold mb-2">{progress.percentage}%</div>
              <div className="text-sm opacity-90">Umumiy progress</div>
              <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress.percentage}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              Video darslar
            </h2>
            <div className="space-y-3">
              {data?.videos && data.videos.length > 0 ? (
                data.videos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-sky-100 dark:bg-sky-950 rounded-lg flex items-center justify-center flex-shrink-0">
                        <PlayCircle className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {video.titleUz}
                        </h3>
                        {video.descriptionUz && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {video.descriptionUz}
                          </p>
                        )}
                        {video.duration && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-slate-500 dark:text-slate-400">
                            <Clock className="w-3 h-3" />
                            <span>{video.duration} daqiqa</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <iframe
                        className="w-full aspect-video rounded-lg"
                        src={video.videoUrl}
                        title={video.titleUz}
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-lg p-8 text-center">
                  <p className="text-slate-600 dark:text-slate-400">
                    Hozircha video darslar yo'q
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              Uy vazifalari
            </h2>
            <div className="space-y-3">
              {data?.homework && data.homework.length > 0 ? (
                data.homework.map((hw) => (
                  <div
                    key={hw.id}
                    className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {hw.titleUz}
                      </h3>
                      {hw.submitted && (
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      {hw.descriptionUz}
                    </p>
                    {hw.deadline && (
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Muddat: {new Date(hw.deadline).toLocaleDateString("uz-UZ")}
                      </div>
                    )}
                    {!hw.submitted && (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Javobingizni kiriting..."
                          value={homeworkContent[hw.id] || ""}
                          onChange={(e) =>
                            setHomeworkContent({ ...homeworkContent, [hw.id]: e.target.value })
                          }
                          rows={3}
                          className="text-sm"
                        />
                        <Button
                          size="sm"
                          onClick={() =>
                            submitMutation.mutate({
                              homeworkId: hw.id,
                              content: homeworkContent[hw.id] || "",
                            })
                          }
                          disabled={!homeworkContent[hw.id] || submitMutation.isPending}
                          className="w-full gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Yuborish
                        </Button>
                      </div>
                    )}
                    {hw.submitted && (
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                        ✓ Topshirilgan
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-lg p-8 text-center">
                  <p className="text-slate-600 dark:text-slate-400">
                    Hozircha uy vazifalari yo'q
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
