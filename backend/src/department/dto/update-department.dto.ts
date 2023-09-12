import { Department } from "../department.entity";

export type UpdateDepartmentDTO = Partial<Department> & Pick<Department, "id">;
