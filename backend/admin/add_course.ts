import { api } from "encore.dev/api";
import { db } from "../db";

export interface AddCourseRequest {
  title: string;
  titleUz: string;
  description: string;
  descriptionUz: string;
  price: number;
  duration: string;
  level: string;
  category: string;
}

export interface AddCourseResponse {
  success: boolean;
  id: number;
}

export const addCourse = api<AddCourseRequest, AddCourseResponse>(
  { expose: true, method: "POST", path: "/admin/course" },
  async (req): Promise<AddCourseResponse> => {
    const result = await db.queryRow<{ id: number }>`
      INSERT INTO courses (title, title_uz, description, description_uz, price, duration, level, category)
      VALUES (${req.title}, ${req.titleUz}, ${req.description}, ${req.descriptionUz}, ${req.price}, ${req.duration}, ${req.level}, ${req.category})
      RETURNING id
    `;

    return { success: true, id: result?.id || 0 };
  }
);
