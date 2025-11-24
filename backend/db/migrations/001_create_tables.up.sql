CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  course_interest TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE testimonials (
  id BIGSERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  student_name_uz TEXT NOT NULL,
  course TEXT NOT NULL,
  rating INTEGER NOT NULL,
  before_score TEXT,
  after_score TEXT,
  testimonial TEXT NOT NULL,
  testimonial_uz TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO testimonials (student_name, student_name_uz, course, rating, before_score, after_score, testimonial, testimonial_uz, image) VALUES
('Aziza Karimova', 'Aziza Karimova', 'IELTS Intensive', 5, '5.5', '8.0', 'Alibek is an exceptional teacher! His teaching methods helped me achieve my dream IELTS score. The course was intensive but extremely effective.', 'Alibek ajoyib o''qituvchi! Uning o''qitish metodlari menga orzuimdagi IELTS natijasiga erishishga yordam berdi. Kurs intensiv, ammo juda samarali edi.', '/testimonials/student1.jpg'),
('Jamshid Mahmudov', 'Jamshid Mahmudov', 'Business English', 5, NULL, NULL, 'The Business English course transformed my career. I can now confidently communicate with international clients and partners.', 'Biznes ingliz tili kursi mening kareramni o''zgartirdi. Endi men xalqaro mijozlar va hamkorlar bilan ishonch bilan muloqot qilaman.', '/testimonials/student2.jpg'),
('Nilufar Rashidova', 'Nilufar Rashidova', 'General English', 5, NULL, NULL, 'Started from A1 level and now I am at B2! Alibek makes learning English fun and engaging. Highly recommend!', 'A1 darajasidan boshladim va hozir B2 darajasidaman! Alibek ingliz tilini o''rganishni qiziqarli va jalb qiluvchi qiladi. Tavsiya qilaman!', '/testimonials/student3.jpg'),
('Sardor Yusupov', 'Sardor Yusupov', 'IELTS Intensive', 5, '6.0', '7.5', 'Excellent teaching quality and materials. The mock tests were very helpful in preparing for the real exam.', 'Ajoyib o''qitish sifati va materiallar. Mock testlar haqiqiy imtihonga tayyorgarlik ko''rishda juda foydali bo''ldi.', '/testimonials/student4.jpg');
