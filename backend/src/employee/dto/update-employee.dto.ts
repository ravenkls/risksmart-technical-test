import { Department } from "src/department/department.entity";
import { Employee } from "../employee.entity";

export type UpdateEmployeeDTO = Partial<Omit<Employee, "department">> &
  Pick<Employee, "id"> & {
    department: Pick<Department, "id"> | null;
  };
