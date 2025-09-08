import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // Non-fatal: app still works without auth; warn in dev only
  if (typeof window !== 'undefined' && !('SUPABASE_WARNED' in window)) {
    // @ts-ignore
    (window as any).SUPABASE_WARNED = true;
    console.warn('Supabase env missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable auth.');
  }
}

export const supabase = createClient(supabaseUrl ?? 'http://localhost', supabaseAnonKey ?? 'public-anon-key', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
