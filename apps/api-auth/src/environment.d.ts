declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
      readonly PORT: string;
      readonly PWD: string;
    }
  }
}

export {};
