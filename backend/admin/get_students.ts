import { api } from "encore.dev/api";
import { db } from "../db";

export interface Student {
  userId: string;
  email: string | null;
  courseId: number;
  courseName: string;
  courseNameUz: string;
  paymentStatus: string;
  paymentMethod: string | null;
  enrolledAt: Date;
}

export interface GetStudentsResponse {
  students: Student[];
}

export const getStudents = api<void, GetStudentsResponse>(
  { expose: true, method: "GET", path: "/admin/students" },
  async (): Promise<GetStudentsResponse> => {
    const students = await db.queryAll<Student>`
      SELECT e.user_id as "userId",
             '' as email,
             e.course_id as "courseId",
             c.title as "courseName",
             c.title_uz as "courseNameUz",
             e.payment_status as "paymentStatus",
             e.payment_method as "paymentMethod",
             e.enrolled_at as "enrolledAt"
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      ORDER BY e.enrolled_at DESC
    `;

    return { students };
  }
);
