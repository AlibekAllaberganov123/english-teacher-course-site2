import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import backend from "~backend/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function LessonModal({
  isOpen,
  onClose,
  courses,
}: {
  isOpen: boolean;
  onClose: () => void;
  courses: any[];
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    courseId: 0,
    title: "",
    titleUz: "",
    content: "",
    contentUz: "",
    orderIndex: 0,
  });

  const addLessonMutation = useMutation({
    mutationFn: (data: any) => backend.admin.addLesson(data),
    onSuccess: () => {
      toast({ title: "Lesson muvaffaqiyatli qo'shildi!" });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      onClose();
      setFormData({
        courseId: 0,
        title: "",
        titleUz: "",
        content: "",
        contentUz: "",
        orderIndex: 0,
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Xatolik",
        description: "Lesson qo'shishda xatolik yuz berdi.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLessonMutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle>Yangi lesson qo'shish</DialogTitle>
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
              <Label>Lesson sarlavhasi (English) *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Lesson 1: Greetings"
                required
              />
            </div>
            <div>
              <Label>Lesson sarlavhasi (Uzbek) *</Label>
              <Input
                value={formData.titleUz}
                onChange={(e) => setFormData({ ...formData, titleUz: e.target.value })}
                placeholder="1-dars: Salomlashish"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Matn (English) *</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="In this lesson..."
                rows={5}
                required
              />
            </div>
            <div>
              <Label>Matn (Uzbek) *</Label>
              <Textarea
                value={formData.contentUz}
                onChange={(e) => setFormData({ ...formData, contentUz: e.target.value })}
                placeholder="Ushbu darsda..."
                rows={5}
                required
              />
            </div>
          </div>
          <div>
            <Label>Tartib raqami *</Label>
            <Input
              type="number"
              value={formData.orderIndex}
              onChange={(e) =>
                setFormData({ ...formData, orderIndex: Number(e.target.value) })
              }
              placeholder="1"
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
