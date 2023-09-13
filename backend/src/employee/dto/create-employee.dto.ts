import { Department } from "src/department/department.entity";
import { Employee } from "../employee.entity";

export type CreateEmployeeDTO = Omit<Employee, "id" | "department"> & {
  department: Pick<Department, "id"> | null;
};
