export interface ServerConfig {
  PORT: number;
  IP_ADDRESS: string;
  NODE_ENV: 'development' | 'production' | 'test';
  DATABASE_URL?: string;
  JWT_SECRET?: string;
  [key: string]: string | number | undefined;
}

export interface DatabaseConfig {
  url: string;
  options?: {
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;
    [key: string]: any;
  };
}