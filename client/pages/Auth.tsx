import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Lock, UserPlus } from 'lucide-react';

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setSessionEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSessionEmail(s?.user?.email ?? null));
    return () => { sub.subscription.unsubscribe(); };
  }, []);

  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    return (
      <div className="container py-24">
        <div className="rounded-3xl border border-brand-aqua-start/30 bg-white/70 p-8">
          <h1 className="text-2xl font-bold">Connect Supabase</h1>
          <p className="mt-2 text-foreground/70">Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable authentication. You can also <a className="underline" href="#open-mcp-popover">Connect to Supabase</a>.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-24">
      <div className="mx-auto max-w-xl rounded-3xl border border-brand-aqua-start/30 ring-1 ring-brand-aqua-start/20 bg-white/70 p-8 backdrop-blur">
        <h1 className="text-3xl font-bold tracking-tight">Account</h1>
        {sessionEmail && (
          <div className="mt-2 text-sm text-foreground/70">Signed in as <span className="font-semibold">{sessionEmail}</span></div>
        )}

        {!sessionEmail && (
          <div className="mt-4 grid gap-2">
            <button
              onClick={async ()=>{ await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/auth' } }); }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-aqua-start/30 bg-white px-5 py-2 text-sm font-semibold hover:bg-white/80"
            >
              Continue with Google
            </button>
            <button
              onClick={async ()=>{ await supabase.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: window.location.origin + '/auth' } }); }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-aqua-start/30 bg-white px-5 py-2 text-sm font-semibold hover:bg-white/80"
            >
              Continue with GitHub
            </button>
            <div className="my-2 h-px bg-border" />
          </div>
        )}

        <Tabs defaultValue={sessionEmail ? 'session' : 'signin'} className="mt-4">
          {!sessionEmail && (
            <TabsList className="bg-white/80 border border-white/60 rounded-xl">
              <TabsTrigger value="signin" className="data-[state=active]:text-brand-aqua-start inline-flex gap-2"><Lock className="h-4 w-4"/> Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:text-brand-aqua-start inline-flex gap-2"><UserPlus className="h-4 w-4"/> Sign Up</TabsTrigger>
            </TabsList>
          )}

          {!sessionEmail && (
            <TabsContent value="signin" className="mt-4">
              <AuthForm mode="signin" />
            </TabsContent>
          )}
          {!sessionEmail && (
            <TabsContent value="signup" className="mt-4">
              <AuthForm mode="signup" />
            </TabsContent>
          )}

          {sessionEmail && (
            <TabsContent value="session" className="mt-4">
              <button
                onClick={async () => { await supabase.auth.signOut(); toast.success('Signed out'); }}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-brand-aqua-start to-brand-aqua-end px-6 py-2 text-sm font-semibold text-white drop-shadow-glow"
              >
                Sign out
              </button>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}

function AuthForm({ mode }: { mode: 'signin' | 'signup' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success('Signed in');
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success('Signed up – check your email');
      }
    } catch (err: any) {
      toast.error(err.message ?? 'Auth error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <label className="text-sm">Email<input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-brand-aqua-start/30 bg-white/90 px-3 py-2"/></label>
      <label className="text-sm">Password<input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-brand-aqua-start/30 bg-white/90 px-3 py-2"/></label>
      <button disabled={loading} className="mt-1 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-aqua-start to-brand-aqua-end px-5 py-2 text-sm font-semibold text-white drop-shadow-glow disabled:opacity-60">{loading ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}</button>
    </form>
  );
}
