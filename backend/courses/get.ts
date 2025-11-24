import { api, APIError } from "encore.dev/api";
import { list } from "./list";

export interface GetCourseParams {
  id: string;
}

// Retrieves a specific course by ID
export const get = api<GetCourseParams, { course: any }>(
  { expose: true, method: "GET", path: "/courses/:id" },
  async ({ id }): Promise<{ course: any }> => {
    const { courses } = await list();
    const course = courses.find(c => c.id === id);
    
    if (!course) {
      throw APIError.notFound("course not found");
    }

    return { course };
  }
);
