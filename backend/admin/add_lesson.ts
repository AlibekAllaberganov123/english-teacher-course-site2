import { api } from "encore.dev/api";
import { db } from "../db";

export interface AddLessonRequest {
  courseId: number;
  title: string;
  titleUz: string;
  content: string;
  contentUz: string;
  orderIndex: number;
}

export interface AddLessonResponse {
  success: boolean;
  id: number;
}

export const addLesson = api<AddLessonRequest, AddLessonResponse>(
  { expose: true, method: "POST", path: "/admin/lesson" },
  async (req): Promise<AddLessonResponse> => {
    const result = await db.queryRow<{ id: number }>`
      INSERT INTO lessons (course_id, title, title_uz, content, content_uz, order_index)
      VALUES (${req.courseId}, ${req.title}, ${req.titleUz}, ${req.content}, ${req.contentUz}, ${req.orderIndex})
      RETURNING id
    `;

    return { success: true, id: result?.id || 0 };
  }
);
