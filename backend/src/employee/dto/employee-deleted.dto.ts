import { Employee } from "../employee.entity";

export type EmployeeDeletedDTO = Pick<Employee, "id">;
