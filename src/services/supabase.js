import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://rhpehnpzcavrjfxxkunz.supabase.co";
export const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJocGVobnB6Y2F2cmpmeHhrdW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU5MDMwMjcsImV4cCI6MjAyMTQ3OTAyN30.b9oS9HI94s08BkCoqXb8C9CSNqSHwXcA5G2pAiZqwgs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
