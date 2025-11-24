import { api } from "encore.dev/api";
import { db } from "../db";

export interface Stats {
  totalStudents: number;
  totalRevenue: number;
  pendingPayments: number;
  completedCourses: number;
}

export const getStats = api<void, Stats>(
  { expose: true, method: "GET", path: "/admin/stats" },
  async (): Promise<Stats> => {
    const studentCount = await db.queryRow<{ count: number }>`
      SELECT COUNT(DISTINCT user_id)::int as count FROM enrollments
    `;

    const revenue = await db.queryRow<{ total: number }>`
      SELECT COALESCE(SUM(c.price), 0)::int as total
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.payment_status = 'paid'
    `;

    const pending = await db.queryRow<{ count: number }>`
      SELECT COUNT(*)::int as count FROM enrollments WHERE payment_status = 'pending'
    `;

    return {
      totalStudents: studentCount?.count || 0,
      totalRevenue: revenue?.total || 0,
      pendingPayments: pending?.count || 0,
      completedCourses: 0,
    };
  }
);
