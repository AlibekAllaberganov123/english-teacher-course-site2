import { SignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isSignedIn } = useAuth();
  const returnUrl = searchParams.get("returnUrl") || "/dashboard";

  useEffect(() => {
    if (isSignedIn) {
      navigate(returnUrl);
    }
  }, [isSignedIn, navigate, returnUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center pt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Xush kelibsiz!
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Davom etish uchun tizimga kiring
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
          <SignIn
            routing="path"
            path="/login"
            signUpUrl="/login"
            afterSignInUrl={returnUrl}
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none",
              },
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
