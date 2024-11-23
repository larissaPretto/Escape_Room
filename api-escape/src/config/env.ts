import "dotenv/config";

interface ServerConfig {
  port: number;
}

interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  name: string;
}

interface Config {
  server: ServerConfig;
  database: DatabaseConfig;
}

export default {
  server: {
    port: Number(process.env.PORT) || 3000,
    host: process.env.SERVER_HOST || "0.0.0.0",
  },
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
} as Config;
