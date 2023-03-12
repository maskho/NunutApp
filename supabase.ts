import {SUPABASE_ANON_PUBLIC_APIKEY, SUPABASE_PROJECT_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient, SupabaseClient} from '@supabase/supabase-js';

const supabaseUrl = SUPABASE_PROJECT_URL;
const supabaseAnonKey = SUPABASE_ANON_PUBLIC_APIKEY;

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: AsyncStorage as any,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
