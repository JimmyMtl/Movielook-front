namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        [key: string]: string | undefined;
    }
}
