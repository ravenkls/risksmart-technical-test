import { Employee } from "./employee.entity";
import { AppDataSource } from "../data-source";
import { GetEmployeeDTO } from "./dto/get-employee.dto";
import { CreateEmployeeDTO } from "./dto/create-employee.dto";
import { EmployeeDeletedDTO } from "./dto/employee-deleted.dto";
import { UpdateEmployeeDTO } from "./dto/update-employee.dto";
import { UserInputError } from "apollo-server-errors";
import { Resolver } from "../types";
import { Department } from "../department/department.entity";

type Queries = {
  employees: Resolver<Employee[]>;
  employee: Resolver<Employee, GetEmployeeDTO>;
};

type Mutations = {
  createEmployee: Resolver<Employee, { data: CreateEmployeeDTO }>;
  updateEmployee: Resolver<Employee, { data: UpdateEmployeeDTO }>;
  deleteEmployee: Resolver<EmployeeDeletedDTO, GetEmployeeDTO>;
};

export const EmployeeQueries: Queries = {
  // Find all employees
  async employees(): Promise<Employee[]> {
    const employee = AppDataSource.getRepository(Employee);
    return employee.find();
  },

  // Find one employee
  async employee(_, { id }: GetEmployeeDTO): Promise<Employee> {
    const employeeRepository = AppDataSource.getRepository<Employee>(Employee);
    const employee = await employeeRepository.findOneBy({ id });
    if (!employee) throw new UserInputError("Employee not found");
    return employee;
  },
};

export const EmployeeMutations: Mutations = {
  // Create employee
  async createEmployee(
    _: unknown,
    { data }: { data: CreateEmployeeDTO }
  ): Promise<Employee> {
    const employeeRepository = AppDataSource.getRepository<Employee>(Employee);
    const departmentRepository =
      AppDataSource.getRepository<Department>(Department);

    // resolve department field
    let department = null;
    if (data.department) {
      department = await departmentRepository.findOneBy({
        id: data.department,
      });
    }

    return employeeRepository.save({
      ...data,
      department,
    });
  },

  // Update employee
  async updateEmployee(
    _: unknown,
    { data }: { data: UpdateEmployeeDTO }
  ): Promise<Employee> {
    const { id, ...rest } = data;
    const employeeRepository = AppDataSource.getRepository<Employee>(Employee);
    const departmentRepository =
      AppDataSource.getRepository<Department>(Department);
    const employee = await employeeRepository.findOneBy({ id });
    if (!employee) throw new UserInputError("Employee not found");

    // resolve department field
    let department = null;
    if (rest.department) {
      department = await departmentRepository.findOneBy({
        id: rest.department,
      });
    }

    return employeeRepository.save({ ...employee, ...rest, department });
  },

  // Delete employee
  async deleteEmployee(_, { id }: GetEmployeeDTO): Promise<EmployeeDeletedDTO> {
    const employeeRepository = AppDataSource.getRepository(Employee);
    const { affected } = await employeeRepository.delete(id);
    if (affected === 0) throw new UserInputError("Employee not found");
    return { id };
  },
};
