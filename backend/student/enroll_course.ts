import { api } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import { db } from "../db";

export interface EnrollCourseRequest {
  courseId: number;
  paymentMethod: string;
}

export interface EnrollCourseResponse {
  success: boolean;
  enrollmentId: number;
}

export const enrollCourse = api<EnrollCourseRequest, EnrollCourseResponse>(
  { auth: true, expose: true, method: "POST", path: "/student/enroll" },
  async (req): Promise<EnrollCourseResponse> => {
    const auth = getAuthData()!;

    const result = await db.queryRow<{ id: number }>`
      INSERT INTO enrollments (user_id, course_id, payment_status, payment_method)
      VALUES (${auth.userID}, ${req.courseId}, 'paid', ${req.paymentMethod})
      ON CONFLICT (user_id, course_id) DO UPDATE SET payment_status = 'paid', payment_method = ${req.paymentMethod}
      RETURNING id
    `;

    const videoCount = await db.queryRow<{ count: number }>`
      SELECT COUNT(*)::int as count FROM videos WHERE course_id = ${req.courseId}
    `;

    const homeworkCount = await db.queryRow<{ count: number }>`
      SELECT COUNT(*)::int as count FROM homework WHERE course_id = ${req.courseId}
    `;

    await db.exec`
      INSERT INTO user_progress (user_id, course_id, total_videos, total_homework)
      VALUES (${auth.userID}, ${req.courseId}, ${videoCount?.count || 0}, ${homeworkCount?.count || 0})
      ON CONFLICT (user_id, course_id) DO UPDATE SET total_videos = ${videoCount?.count || 0}, total_homework = ${homeworkCount?.count || 0}
    `;

    return { success: true, enrollmentId: result?.id || 0 };
  }
);
