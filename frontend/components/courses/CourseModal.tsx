import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Smartphone } from "lucide-react";
import type { Course } from "~backend/courses/list";
import { useLanguage } from "@/hooks/useLanguage";

interface CourseModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

export function CourseModal({ course, isOpen, onClose }: CourseModalProps) {
  const { language } = useLanguage();

  const title = language === "uz" ? course.titleUz : course.title;
  const description = language === "uz" ? course.descriptionUz : course.description;
  const features = language === "uz" ? course.featuresUz : course.features;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm";
  };

  const paymentMethods = [
    { name: "Click", icon: Smartphone },
    { name: "Payme", icon: Smartphone },
    { name: "Uzcard", icon: CreditCard },
    { name: "Payze", icon: CreditCard },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="aspect-video bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl overflow-hidden">
            <img
              src={course.image}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect fill='%23E0F2FE' width='600' height='340'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%230F172A' font-size='24' font-family='Arial'%3E${course.category}%3C/text%3E%3C/svg%3E`;
              }}
            />
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Kurs tafsilotlari:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Davomiyligi:</span>
                <div className="font-medium">{course.duration}</div>
              </div>
              <div>
                <span className="text-slate-600">Format:</span>
                <div className="font-medium capitalize">{course.format}</div>
              </div>
              <div>
                <span className="text-slate-600">Daraja:</span>
                <div className="font-medium">{course.level}</div>
              </div>
              <div>
                <span className="text-slate-600">Boshlanishi:</span>
                <div className="font-medium">
                  {new Date(course.startDate).toLocaleDateString("uz-UZ")}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Kursga kiradi:</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm text-slate-600">Jami narx:</div>
                <div className="text-3xl font-bold text-slate-900">
                  {formatPrice(course.price)}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-3">To'lov usulini tanlang:</h3>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <Button
                    key={method.name}
                    variant="outline"
                    className="h-auto py-4 gap-2"
                  >
                    <method.icon className="w-5 h-5" />
                    {method.name}
                  </Button>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-500 text-center mb-4">
              To'lov tizimi integratsiyasi tez orada qo'shiladi. Hozircha, iltimos, biz bilan bog'laning.
            </p>

            <Button className="w-full" size="lg" onClick={onClose}>
              Biz bilan bog'laning
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
