import { Department } from "../department.entity";

export type DepartmentDeletedDTO = Pick<Department, "id">;
