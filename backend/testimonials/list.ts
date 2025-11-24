import { api } from "encore.dev/api";
import { db } from "../db";

export interface Testimonial {
  id: number;
  studentName: string;
  studentNameUz: string;
  course: string;
  rating: number;
  beforeScore?: string;
  afterScore?: string;
  testimonial: string;
  testimonialUz: string;
  image?: string;
}

export interface ListTestimonialsResponse {
  testimonials: Testimonial[];
}

// Lists all testimonials
export const list = api<void, ListTestimonialsResponse>(
  { expose: true, method: "GET", path: "/testimonials" },
  async (): Promise<ListTestimonialsResponse> => {
    const rows = await db.queryAll<{
      id: number;
      student_name: string;
      student_name_uz: string;
      course: string;
      rating: number;
      before_score: string | null;
      after_score: string | null;
      testimonial: string;
      testimonial_uz: string;
      image: string | null;
    }>`
      SELECT id, student_name, student_name_uz, course, rating, before_score, after_score, testimonial, testimonial_uz, image
      FROM testimonials
      ORDER BY created_at DESC
    `;

    const testimonials = rows.map(row => ({
      id: row.id,
      studentName: row.student_name,
      studentNameUz: row.student_name_uz,
      course: row.course,
      rating: row.rating,
      beforeScore: row.before_score || undefined,
      afterScore: row.after_score || undefined,
      testimonial: row.testimonial,
      testimonialUz: row.testimonial_uz,
      image: row.image || undefined,
    }));

    return { testimonials };
  }
);
