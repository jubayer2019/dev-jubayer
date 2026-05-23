"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiLock, FiMail, FiUser, FiEye, FiArrowLeft } from "react-icons/fi";
import { signIn } from "@/lib/auth-client";
import api from "@/lib/api";

function getReadableErrorMessage(error, fallback = "Authentication failed") {
  if (!error) {
    return fallback;
  }

  const apiMessage = error?.response?.data?.message;
  if (typeof apiMessage === "string" && apiMessage.trim()) {
    return apiMessage;
  }

  if (typeof error.message === "string" && error.message.trim()) {
    return error.message;
  }

  return fallback;
}

export function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mode, setMode] = useState(searchParams.get("mode") === "signup" ? "signup" : "login");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const title = useMemo(() => (mode === "login" ? "Welcome back" : "Create your account"), [mode]);

  const onSubmit = async (formData) => {
    try {
      if (mode === "signup") {
        await api.post("/auth/register", formData);
        toast.success("Account created successfully");
      } else {
        await api.post("/auth/login", formData);
        toast.success("Logged in successfully");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error(getReadableErrorMessage(error));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`,
      });
    } catch (error) {
      toast.error("Google sign-in failed");
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient px-4 py-10 text-white">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel flex flex-col justify-between rounded-[2rem] p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.45em] text-white/40">Better Auth Login</p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight">{title}</h1>
            <p className="mt-5 max-w-xl text-white/65 leading-8">
              Access the portfolio dashboard, manage orders, and update your profile using secure session-based authentication.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: <FiLock />, label: "Secure sessions" },
              { icon: <FiEye />, label: "Role-based access" },
              { icon: <FiUser />, label: "Admin dashboard" },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-xl text-white">{item.icon}</div>
                <p className="mt-4 text-sm text-white/75">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form onSubmit={handleSubmit(onSubmit)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[2rem] p-8">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10"
          >
            <FiArrowLeft /> Back to Home
          </button>

          <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
            <button type="button" onClick={() => setMode("login")} className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition ${mode === "login" ? "bg-button-gradient text-white shadow-glow" : "text-white/65"}`}>
              Login
            </button>
            <button type="button" onClick={() => setMode("signup")} className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition ${mode === "signup" ? "bg-button-gradient text-white shadow-glow" : "text-white/65"}`}>
              Signup
            </button>
          </div>

          <div className="mt-8 space-y-5">
            {mode === "signup" ? (
              <div>
                <label className="mb-2 block text-sm text-white/65">Name</label>
                <input {...register("name", { required: true })} placeholder="Jubayer Khan" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35" />
                {errors.name ? <p className="mt-2 text-sm text-ember">Name is required</p> : null}
              </div>
            ) : null}

            <div>
              <label className="mb-2 block text-sm text-white/65">Email</label>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <FiMail className="text-white/45" />
                <input {...register("email", { required: true })} type="email" placeholder="you@example.com" className="w-full bg-transparent text-white outline-none placeholder:text-white/35" />
              </div>
              {errors.email ? <p className="mt-2 text-sm text-ember">Email is required</p> : null}
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/65">Password</label>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <FiLock className="text-white/45" />
                <input {...register("password", { required: true, minLength: 8 })} type="password" placeholder="********" className="w-full bg-transparent text-white outline-none placeholder:text-white/35" />
              </div>
              {errors.password ? <p className="mt-2 text-sm text-ember">Password must be at least 8 characters</p> : null}
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="mt-8 w-full rounded-full bg-button-gradient px-6 py-3 font-medium text-white shadow-glow transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? "Please wait..." : mode === "login" ? "Login Now" : "Create Account"}
          </button>

          <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-[0.45em] text-white/35">
            <span className="h-px flex-1 bg-white/10" />
            or
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <button type="button" onClick={handleGoogleSignIn} className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-white/85 transition hover:bg-white/10">
            Continue with Google
          </button>
        </motion.form>
      </div>
    </div>
  );
}
