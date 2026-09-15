/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL base do backend. Vazio usa a mesma origem (proxy do Vite em desenvolvimento). */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
