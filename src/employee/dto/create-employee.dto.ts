import { Employee } from "../employee.entity";

export type CreateEmployeeDTO = Omit<Employee, "id"> & {
  department: number | null;
};
