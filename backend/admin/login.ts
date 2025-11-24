import { api, Cookie } from "encore.dev/api";
import { db } from "../db";
import * as crypto from "crypto";

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  session?: Cookie<"admin_session">;
  error?: string;
}

export const login = api<AdminLoginRequest, AdminLoginResponse>(
  { expose: true, method: "POST", path: "/admin/login" },
  async (req): Promise<AdminLoginResponse> => {
    const simpleHash = crypto.createHash("md5").update(req.password).digest("hex");
    
    if (req.email === "admin@alibek.uz" && req.password === "admin2025") {
      const sessionToken = crypto.randomBytes(32).toString("hex");
      
      return {
        success: true,
        session: {
          value: sessionToken,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
        },
      };
    }

    return {
      success: false,
      error: "Email yoki parol noto'g'ri",
    };
  }
);
