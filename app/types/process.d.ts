declare namespace NodeJS {
  interface ProcessEnv {
    VITE_SUPABASE_URL: string;
    VITE_SUPABASE_KEY: string;
    VITE_DATABASE_URL: string;
  }
}
