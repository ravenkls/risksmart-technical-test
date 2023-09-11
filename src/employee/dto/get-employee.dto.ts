import { Employee } from "../employee.entity";

export type GetEmployeeDTO = Pick<Employee, "id">;
