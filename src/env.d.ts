declare namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_HOST: string;
    POSTGRES_NAME: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
  }
}
