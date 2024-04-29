declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_SESSION_SECRET: string;
            JWT_SESSION_EXPIRY: string;
            SESSION_ENCRYPT_SECRET: string;
            SESSION_ALGORITHM: string;
            SESSION_ENCRYPT_SECRET: string;
        }
    }
}

export {};
