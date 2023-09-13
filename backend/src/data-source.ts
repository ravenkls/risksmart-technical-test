import "reflect-metadata";
import { DataSource } from "typeorm";
import { initialiseDepartments } from "./department/department.setup";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: true,
  logging: false,
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(async (dataSource) => {
    await initialiseDepartments(dataSource);
    console.log("✔ Database setup complete");
  })
  .catch((err) => {
    console.error(err);
  });
