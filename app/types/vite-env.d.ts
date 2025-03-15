interface ImportMetaEnv {
  readonly VITE_SUPABASE_PASSWORD: string;
  readonly VITE_DATABASE_URL: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
