export interface AppConfig {
  host: string;
  port: number;
  frontendOrigin: string;
}

export function getConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const port = Number(env.PORT ?? 4000);

  return {
    host: env.HOST ?? "0.0.0.0",
    port: Number.isFinite(port) ? port : 4000,
    frontendOrigin: env.FRONTEND_ORIGIN ?? "http://localhost:3000",
  };
}
