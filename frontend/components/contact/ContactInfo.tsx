import { Mail, Phone, MapPin, Clock } from "lucide-react";

export function ContactInfo() {
  const contactDetails = [
    {
      icon: Phone,
      label: "Telefon",
      value: "+998 90 123 45 67",
      link: "tel:+998901234567",
    },
    {
      icon: Mail,
      label: "Email",
      value: "alibek@english.uz",
      link: "mailto:alibek@english.uz",
    },
    {
      icon: MapPin,
      label: "Manzil",
      value: "Tashkent, Uzbekistan",
      link: "#",
    },
    {
      icon: Clock,
      label: "Ish vaqti",
      value: "Dushanba - Shanba: 9:00 - 19:00",
      link: "#",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Aloqa ma'lumotlari</h2>
        <p className="text-slate-600">
          Savollaringiz bo'lsa yoki bepul konsultatsiya olmoqchi bo'lsangiz, biz bilan bog'laning.
          Men sizga yordam berishdan xursand bo'laman!
        </p>
      </div>

      <div className="space-y-4">
        {contactDetails.map((detail, index) => (
          <a
            key={index}
            href={detail.link}
            className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-sky-50 transition-colors group"
          >
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-sky-100 transition-colors">
              <detail.icon className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">{detail.label}</div>
              <div className="font-medium text-slate-900">{detail.value}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-sky-50 rounded-xl p-6">
        <h3 className="font-semibold text-slate-900 mb-2">Bepul konsultatsiya</h3>
        <p className="text-sm text-slate-600 mb-4">
          30 daqiqalik bepul konsultatsiya davomida sizning darajangizni aniqlayman va 
          eng mos o'quv rejani tayyorlayman.
        </p>
        <div className="flex gap-2">
          <a
            href="https://wa.me/998901234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
              WhatsApp orqali
            </button>
          </a>
          <a href="tel:+998901234567" className="flex-1">
            <button className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-sm font-medium">
              Qo'ng'iroq qilish
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
