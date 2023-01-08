import "dotenv/config";
import { DataSourceOptions } from "typeorm";

let config: DataSourceOptions;

if (process.env.NODE_ENV === "test") {
  config = {
    type: "sqlite",
    database: "./test.sqlite",
    synchronize: false,
    logging: false,
    entities: ["src/app/shared/database/entities/*"],
    migrations: ["src/main/database/migrations/*"],
  };
} else {
  const rootDir = process.env.NODE_ENV === "production" ? "dist" : "src";

  console.log("ROOT DIR: " + rootDir);
  console.log("NODE ENV: " + process.env.NODE_ENV);
  config = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: false,
    ssl: {
      rejectUnauthorized: false,
    },
    entities: [rootDir + "/app/shared/database/entities/*"],
    migrations: [rootDir + "/main/database/migrations/*"],
  };
}

export default config;
