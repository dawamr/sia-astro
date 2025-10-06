/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string;
  readonly PUBLIC_API_TIMEOUT: string;
  readonly PUBLIC_APP_NAME: string;
  readonly PUBLIC_APP_VERSION: string;
  readonly PUBLIC_APP_ENV: string;
  readonly PUBLIC_ENABLE_ANALYTICS: string;
  readonly PUBLIC_ENABLE_DEBUG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
