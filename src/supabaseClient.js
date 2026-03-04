import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Robust URL validation to prevent Supabase from crashing the app
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

if (!supabaseUrl || !supabaseAnonKey || !isValidUrl(supabaseUrl)) {
    console.warn('Supabase URL or Anon Key is missing or invalid. Dynamic features (Contact/Work) will fallback to static mode.');
}

// Export a resilient client
export const supabase = (supabaseUrl && isValidUrl(supabaseUrl) && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        from: () => ({
            insert: async () => ({ error: new Error('Supabase not configured') }),
            select: () => ({
                order: () => ({ data: null, error: new Error('Supabase not configured') })
            })
        })
    };
