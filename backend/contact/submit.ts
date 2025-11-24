import { api } from "encore.dev/api";
import { db } from "../db";

export interface SubmitContactRequest {
  name: string;
  phone: string;
  email?: string;
  courseInterest?: string;
  message?: string;
}

export interface SubmitContactResponse {
  success: boolean;
  message: string;
}

// Submits a contact form
export const submit = api<SubmitContactRequest, SubmitContactResponse>(
  { expose: true, method: "POST", path: "/contact" },
  async (req): Promise<SubmitContactResponse> => {
    await db.exec`
      INSERT INTO contacts (name, phone, email, course_interest, message)
      VALUES (${req.name}, ${req.phone}, ${req.email || null}, ${req.courseInterest || null}, ${req.message || null})
    `;

    return {
      success: true,
      message: "Your message has been sent successfully! We will contact you soon.",
    };
  }
);
