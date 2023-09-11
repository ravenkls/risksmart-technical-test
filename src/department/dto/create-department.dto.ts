import { Department } from "../department.entity";

export type CreateDepartmentDTO = Omit<Department, "id">;
