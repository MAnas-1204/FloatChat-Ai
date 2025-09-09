import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function ResetPage() {
  const [mode, setMode] = useState<"request" | "update">("request");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) setMode("update");
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setMode("update");
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  async function sendReset() {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset",
    });
    if (error) return toast.error(error.message);
    toast.success("Reset email sent");
  }
  async function updatePassword() {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return toast.error(error.message);
    toast.success("Password updated");
    window.location.assign("/auth");
  }

  return (
    <div className="min-h-[80vh] container grid place-items-center py-10">
      <div className="relative mx-auto max-w-xl rounded-3xl border border-brand-aqua-start/30 ring-1 ring-brand-aqua-start/20 bg-white/70 p-8 backdrop-blur">
        <div className="absolute left-4 top-4">
          <a
            href="/"
            className="inline-flex items-center rounded-full border border-white/30 bg-white/60 px-4 py-2 text-sm hover:bg-white"
          >
            ← Back to Home
          </a>
        </div>
        <h1 className="text-2xl font-bold">Reset Password</h1>
        {mode === "request" ? (
          <div className="mt-4 grid gap-3">
            <label className="text-sm">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-brand-aqua-start/30 bg-white/90 px-3 py-2"
              />
            </label>
            <button
              onClick={sendReset}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-aqua-start to-brand-aqua-end px-5 py-2 text-sm font-semibold text-white drop-shadow-glow"
            >
              Send reset link
            </button>
          </div>
        ) : (
          <div className="mt-4 grid gap-3">
            <label className="text-sm">
              New Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-brand-aqua-start/30 bg-white/90 px-3 py-2"
              />
            </label>
            <button
              onClick={updatePassword}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-aqua-start to-brand-aqua-end px-5 py-2 text-sm font-semibold text-white drop-shadow-glow"
            >
              Update password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
