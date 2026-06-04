export interface AppConfig {
  host: string;
  port: number;
  frontendOrigin: string;
  databaseUrl?: string;
}

export function getConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const port = Number(env.PORT ?? 3002);

  return {
    host: env.HOST ?? "0.0.0.0",
    port: Number.isFinite(port) ? port : 3002,
    frontendOrigin: env.FRONTEND_ORIGIN ?? "http://localhost:3000",
    databaseUrl: env.DATABASE_URL,
  };
}
