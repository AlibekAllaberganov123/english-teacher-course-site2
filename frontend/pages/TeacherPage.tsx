import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  Video,
} from "lucide-react";
import backend from "~backend/client";
import { Button } from "@/components/ui/button";

export function TeacherPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: stats } = useQuery({
    queryKey: ["teacher-stats"],
    queryFn: () => backend.admin.getStats(),
    enabled: isLoggedIn,
  });

  const { data: studentsData } = useQuery({
    queryKey: ["teacher-students"],
    queryFn: () => backend.admin.getStudents(),
    enabled: isLoggedIn,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "teacher@alibek.uz" && password === "teacher123") {
      setIsLoggedIn(true);
    }
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
              Teacher Panel
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              O'qituvchi sifatida kirish
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                placeholder="teacher@alibek.uz"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Parol</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Kirish
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  const statCards = [
    {
      title: "O'quvchilar",
      value: stats?.totalStudents || 0,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Videolar",
      value: stats?.completedCourses || 0,
      icon: Video,
      color: "bg-green-500",
    },
    {
      title: "Uy vazifalar",
      value: stats?.pendingPayments || 0,
      icon: FileText,
      color: "bg-yellow-500",
    },
    {
      title: "Baholangan",
      value: stats?.completedCourses || 0,
      icon: CheckCircle,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Teacher Panel
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            O'quvchilarni kuzatish va baholash
          </p>
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

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            O'quvchilar ro'yxati
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    O'quvchi
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Kurs
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Progress
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Holat
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentsData?.students.map((student, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 dark:border-slate-800"
                  >
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">
                      {student.userId.substring(0, 12)}...
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {student.courseNameUz}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      75%
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
                        Faol
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
