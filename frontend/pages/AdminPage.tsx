import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  Clock,
  Award,
  Video,
  FileText,
  Plus,
  LogOut,
} from "lucide-react";
import backend from "~backend/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CourseModal } from "@/components/admin/CourseModal";
import { LessonModal } from "@/components/admin/LessonModal";

export function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showHomeworkModal, setShowHomeworkModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      backend.admin.login(data),
    onSuccess: (data) => {
      if (data.success) {
        setIsLoggedIn(true);
        toast({
          title: "Muvaffaqiyatli!",
          description: "Admin panelga xush kelibsiz.",
        });
      } else {
        toast({
          title: "Xatolik",
          description: data.error || "Login yoki parol noto'g'ri",
          variant: "destructive",
        });
      }
    },
  });

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => backend.admin.getStats(),
    enabled: isLoggedIn,
  });

  const { data: studentsData } = useQuery({
    queryKey: ["admin-students"],
    queryFn: () => backend.admin.getStudents(),
    enabled: isLoggedIn,
  });

  const { data: coursesData } = useQuery({
    queryKey: ["courses"],
    queryFn: () => backend.courses.list(),
    enabled: isLoggedIn,
  });

  const courses = coursesData?.courses || [];

  const addVideoMutation = useMutation({
    mutationFn: (data: any) => backend.admin.addVideo(data),
    onSuccess: () => {
      toast({ title: "Video qo'shildi!" });
      setShowVideoModal(false);
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const addHomeworkMutation = useMutation({
    mutationFn: (data: any) => backend.admin.addHomework(data),
    onSuccess: () => {
      toast({ title: "Uy vazifa qo'shildi!" });
      setShowHomeworkModal(false);
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    navigate("/");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Admin Panel
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Tizimga kirish uchun login ma'lumotlaringizni kiriting
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@alibek.uz"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Parol</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Kirish..." : "Kirish"}
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Jami o'quvchilar",
      value: stats?.totalStudents || 0,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Jami daromad",
      value: `${((stats?.totalRevenue || 0) / 1000000).toFixed(1)}M so'm`,
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: "Kutilayotgan to'lovlar",
      value: stats?.pendingPayments || 0,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Tugallangan kurslar",
      value: stats?.completedCourses || 0,
      icon: Award,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Admin Panel
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Platformani boshqarish
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="w-4 h-4" />
            Chiqish
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 ${card.color} bg-opacity-10 rounded-lg flex items-center justify-center`}
                >
                  <card.icon className={`w-6 h-6 ${card.color.replace("bg-", "text-")}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {card.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {card.title}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button
            onClick={() => setShowVideoModal(true)}
            size="lg"
            className="gap-2 h-14"
          >
            <Video className="w-5 h-5" />
            Yangi video qo'shish
          </Button>
          <Button
            onClick={() => setShowHomeworkModal(true)}
            size="lg"
            variant="outline"
            className="gap-2 h-14"
          >
            <FileText className="w-5 h-5" />
            Yangi uy vazifa
          </Button>
          <Button
            onClick={() => setShowCourseModal(true)}
            size="lg"
            variant="outline"
            className="gap-2 h-14"
          >
            <Plus className="w-5 h-5" />
            Yangi kurs
          </Button>
          <Button
            onClick={() => setShowLessonModal(true)}
            size="lg"
            variant="outline"
            className="gap-2 h-14"
          >
            <Plus className="w-5 h-5" />
            Yangi lesson
          </Button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            O'quvchilar ro'yxati
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    User ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Kurs
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    To'lov holati
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    To'lov usuli
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Ro'yxatdan o'tgan
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentsData?.students.map((student, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 dark:border-slate-800"
                  >
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {student.userId.substring(0, 12)}...
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">
                      {student.courseNameUz}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          student.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                        }`}
                      >
                        {student.paymentStatus === "paid" ? "To'langan" : "Kutilmoqda"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {student.paymentMethod || "-"}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {new Date(student.enrolledAt).toLocaleDateString("uz-UZ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <VideoModal
          isOpen={showVideoModal}
          onClose={() => setShowVideoModal(false)}
          courses={courses || []}
          onSubmit={(data) => addVideoMutation.mutate(data)}
        />
        <HomeworkModal
          isOpen={showHomeworkModal}
          onClose={() => setShowHomeworkModal(false)}
          courses={courses || []}
          onSubmit={(data) => addHomeworkMutation.mutate(data)}
        />
        <CourseModal
          isOpen={showCourseModal}
          onClose={() => setShowCourseModal(false)}
        />
        <LessonModal
          isOpen={showLessonModal}
          onClose={() => setShowLessonModal(false)}
          courses={courses || []}
        />
      </div>
    </div>
  );
}

function VideoModal({
  isOpen,
  onClose,
  courses,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  courses: any[];
  onSubmit: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    courseId: 0,
    title: "",
    titleUz: "",
    description: "",
    descriptionUz: "",
    videoUrl: "",
    duration: 0,
    orderIndex: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle>Yangi video dars qo'shish</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Kurs</Label>
            <select
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              value={formData.courseId}
              onChange={(e) =>
                setFormData({ ...formData, courseId: Number(e.target.value) })
              }
              required
            >
              <option value={0}>Kursni tanlang</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.titleUz}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Sarlavha (English)</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Sarlavha (Uzbek)</Label>
              <Input
                value={formData.titleUz}
                onChange={(e) =>
                  setFormData({ ...formData, titleUz: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div>
            <Label>Video URL (YouTube embed yoki mp4)</Label>
            <Input
              value={formData.videoUrl}
              onChange={(e) =>
                setFormData({ ...formData, videoUrl: e.target.value })
              }
              placeholder="https://www.youtube.com/embed/..."
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Davomiyligi (daqiqa)</Label>
              <Input
                type="number"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <Label>Tartib raqami</Label>
              <Input
                type="number"
                value={formData.orderIndex}
                onChange={(e) =>
                  setFormData({ ...formData, orderIndex: Number(e.target.value) })
                }
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Qo'shish
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function HomeworkModal({
  isOpen,
  onClose,
  courses,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  courses: any[];
  onSubmit: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    courseId: 0,
    title: "",
    titleUz: "",
    description: "",
    descriptionUz: "",
    deadline: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.courseId || formData.courseId === 0) {
      alert("Iltimos, kursni tanlang!");
      return;
    }
    if (!formData.title || !formData.titleUz) {
      alert("Iltimos, sarlavhalarni to'ldiring!");
      return;
    }
    if (!formData.description || !formData.descriptionUz) {
      alert("Iltimos, tavsiflarni to'ldiring!");
      return;
    }
    if (!formData.deadline) {
      alert("Iltimos, muddatni belgilang!");
      return;
    }
    onSubmit({
      ...formData,
      deadline: new Date(formData.deadline),
    });
    setFormData({
      courseId: 0,
      title: "",
      titleUz: "",
      description: "",
      descriptionUz: "",
      deadline: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle>Yangi uy vazifa qo'shish</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Kurs *</Label>
            <select
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              value={formData.courseId}
              onChange={(e) =>
                setFormData({ ...formData, courseId: Number(e.target.value) })
              }
              required
            >
              <option value="">Kursni tanlang</option>
              {courses.map((course, index) => (
                <option key={index} value={index + 1}>
                  {course.titleUz}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Sarlavha (English) *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Unit 1: Introduction"
                required
              />
            </div>
            <div>
              <Label>Sarlavha (Uzbek) *</Label>
              <Input
                value={formData.titleUz}
                onChange={(e) =>
                  setFormData({ ...formData, titleUz: e.target.value })
                }
                placeholder="1-bo'lim: Kirish"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tavsif (English) *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Complete exercises 1-5..."
                required
              />
            </div>
            <div>
              <Label>Tavsif (Uzbek) *</Label>
              <Textarea
                value={formData.descriptionUz}
                onChange={(e) =>
                  setFormData({ ...formData, descriptionUz: e.target.value })
                }
                placeholder="1-5 mashqlarni bajaring..."
                required
              />
            </div>
          </div>
          <div>
            <Label>Muddat *</Label>
            <Input
              type="date"
              value={formData.deadline}
              onChange={(e) =>
                setFormData({ ...formData, deadline: e.target.value })
              }
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Qo'shish
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
