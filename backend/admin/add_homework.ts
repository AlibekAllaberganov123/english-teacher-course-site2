import { api } from "encore.dev/api";
import { db } from "../db";

export interface AddHomeworkRequest {
  courseId: number;
  title: string;
  titleUz: string;
  description: string;
  descriptionUz: string;
  deadline?: Date;
}

export interface AddHomeworkResponse {
  success: boolean;
  id: number;
}

export const addHomework = api<AddHomeworkRequest, AddHomeworkResponse>(
  { expose: true, method: "POST", path: "/admin/homework" },
  async (req): Promise<AddHomeworkResponse> => {
    const result = await db.queryRow<{ id: number }>`
      INSERT INTO homework (course_id, title, title_uz, description, description_uz, deadline)
      VALUES (${req.courseId}, ${req.title}, ${req.titleUz}, ${req.description}, ${req.descriptionUz}, ${req.deadline || null})
      RETURNING id
    `;

    return { success: true, id: result?.id || 0 };
  }
);
