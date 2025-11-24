import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import backend from "~backend/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Send } from "lucide-react";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  courseInterest: string;
  message: string;
}

export function ContactForm() {
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const mutation = useMutation({
    mutationFn: (data: ContactFormData) => backend.contact.submit(data),
    onSuccess: () => {
      toast({
        title: "Muvaffaqiyatli yuborildi!",
        description: "Tez orada siz bilan bog'lanamiz.",
      });
      reset();
      setSelectedCourse("");
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Xatolik yuz berdi",
        description: "Iltimos, qaytadan urinib ko'ring.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate({
      ...data,
      courseInterest: selectedCourse,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Bog'lanish uchun formani to'ldiring</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="name">Ismingiz *</Label>
          <Input
            id="name"
            {...register("name", { required: "Ism kiritish majburiy" })}
            placeholder="Ismingizni kiriting"
            className="mt-1"
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Telefon raqam *</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone", { required: "Telefon raqam kiritish majburiy" })}
            placeholder="+998 90 123 45 67"
            className="mt-1"
          />
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="email@example.com"
            className="mt-1"
          />
        </div>

        <div>
          <Label>Qiziqayotgan kurs</Label>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Kursni tanlang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ielts">IELTS Intensive</SelectItem>
              <SelectItem value="general">General English</SelectItem>
              <SelectItem value="speaking">Speaking Club</SelectItem>
              <SelectItem value="business">Business English</SelectItem>
              <SelectItem value="kids">Kids English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="message">Xabar</Label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder="Savollaringiz yoki izohlaringizni yozing..."
            rows={4}
            className="mt-1"
          />
        </div>

        <Button type="submit" className="w-full gap-2" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Yuborilmoqda...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Yuborish
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
