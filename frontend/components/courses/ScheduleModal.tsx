import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock } from "lucide-react";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  schedule: Array<{ day: string; time: string }>;
}

export function ScheduleModal({ isOpen, onClose, courseTitle, schedule }: ScheduleModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            Dars jadvali
          </DialogTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">{courseTitle}</p>
        </DialogHeader>

        <div className="space-y-3 pt-4">
          {schedule.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-sky-50 dark:bg-sky-950 rounded-lg border border-sky-100 dark:border-sky-900"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <span className="font-medium text-slate-900 dark:text-white">{item.day}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span className="font-semibold">{item.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-100 dark:border-blue-900">
          <p className="text-sm text-blue-900 dark:text-blue-300">
            📌 Dars vaqti o'zgarishi mumkin. Aniq ma'lumot uchun bog'laning.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
