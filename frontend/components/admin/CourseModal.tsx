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

export function CourseModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    titleUz: "",
    description: "",
    descriptionUz: "",
    price: "",
    duration: "",
    level: "",
    category: "",
  });

  const addCourseMutation = useMutation({
    mutationFn: (data: any) => backend.admin.addCourse(data),
    onSuccess: () => {
      toast({ title: "Kurs muvaffaqiyatli qo'shildi!" });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      onClose();
      setFormData({
        title: "",
        titleUz: "",
        description: "",
        descriptionUz: "",
        price: "",
        duration: "",
        level: "",
        category: "",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Xatolik",
        description: "Kurs qo'shishda xatolik yuz berdi.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCourseMutation.mutate({
      ...formData,
      price: Number(formData.price),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle>Yangi kurs qo'shish</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Kurs nomi (English) *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="IELTS Preparation"
                required
              />
            </div>
            <div>
              <Label>Kurs nomi (Uzbek) *</Label>
              <Input
                value={formData.titleUz}
                onChange={(e) => setFormData({ ...formData, titleUz: e.target.value })}
                placeholder="IELTS Tayyorlov"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tavsif (English) *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Complete preparation for..."
                required
              />
            </div>
            <div>
              <Label>Tavsif (Uzbek) *</Label>
              <Textarea
                value={formData.descriptionUz}
                onChange={(e) => setFormData({ ...formData, descriptionUz: e.target.value })}
                placeholder="To'liq tayyorlov..."
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Narx (so'm) *</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="1500000"
                required
              />
            </div>
            <div>
              <Label>Davomiyligi *</Label>
              <Input
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="3 months"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Daraja *</Label>
              <Input
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                placeholder="Intermediate"
                required
              />
            </div>
            <div>
              <Label>Kategoriya *</Label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="IELTS"
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
