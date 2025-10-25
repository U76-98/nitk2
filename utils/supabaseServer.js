// utils/supabaseServer.js
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers'; // Import from next/headers

export function createClient() {
  const cookieStore = cookies(); // This function needs the right context

  // Ensure env variables are being read
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or Key missing in supabaseServer.js");
    // Optionally throw an error or handle it appropriately
    throw new Error("Missing Supabase environment variables");
  }


  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name) {
          // Check if cookieStore is valid before calling get
          return cookieStore.get(name)?.value;
        },
        // You might need these later if you use Server Actions to modify data
        // set(name, value, options) {
        //   cookieStore.set({ name, value, ...options });
        // },
        // remove(name, options) {
        //   cookieStore.delete({ name, ...options });
        // },
      },
    }
  );
}