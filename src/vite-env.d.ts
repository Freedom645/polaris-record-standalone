/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_VERSION: string;
  readonly VITE_NAME: string;
  readonly VITE_EAMU_POLARIS_CHORD_MUSIC_DATA_URL: string;
  readonly VITE_EAMU_COURSE_ANNOUNCE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
