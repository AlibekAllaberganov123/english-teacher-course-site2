import { api } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import { db } from "../db";

export interface SubmitHomeworkRequest {
  homeworkId: number;
  content: string;
}

export interface SubmitHomeworkResponse {
  success: boolean;
}

export const submitHomework = api<SubmitHomeworkRequest, SubmitHomeworkResponse>(
  { auth: true, expose: true, method: "POST", path: "/student/homework/submit" },
  async (req): Promise<SubmitHomeworkResponse> => {
    const auth = getAuthData()!;

    await db.exec`
      INSERT INTO homework_submissions (homework_id, user_id, content)
      VALUES (${req.homeworkId}, ${auth.userID}, ${req.content})
      ON CONFLICT (homework_id, user_id) DO UPDATE SET content = ${req.content}, submitted_at = NOW()
    `;

    return { success: true };
  }
);
