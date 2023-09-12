import { Employee } from "../employee.entity";

export type UpdateEmployeeDTO = Partial<Employee> &
  Pick<Employee, "id"> & {
    department: number | null;
  };
