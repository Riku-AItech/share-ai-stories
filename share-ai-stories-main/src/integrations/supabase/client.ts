// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bpctkykjshfrkoywomgz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwY3RreWtqc2hmcmtveXdvbWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwNjY5NzMsImV4cCI6MjA1MTY0Mjk3M30.ObunIBgwmY3J74R-ySd6R-wJASNKOms32sRs1hX07Nw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);