import { Department } from "./department.entity";
import { AppDataSource } from "../data-source";
import { GetDepartmentDTO } from "./dto/get-department.dto";
import { CreateDepartmentDTO } from "./dto/create-department.dto";
import { DepartmentDeletedDTO } from "./dto/department-deleted.dto";
import { UpdateDepartmentDTO } from "./dto/update-department.dto";
import { UserInputError } from "apollo-server-errors";
import { Resolver } from "../types";
import { Employee } from "../employee/employee.entity";

type FieldResolvers = {
  Department: {
    employees: Resolver<Employee[]>;
  };
};

type Queries = {
  departments: Resolver<Department[]>;
  department: Resolver<Department, GetDepartmentDTO>;
};

type Mutations = {
  createDepartment: Resolver<Department, { data: CreateDepartmentDTO }>;
  updateDepartment: Resolver<Department, { data: UpdateDepartmentDTO }>;
  deleteDepartment: Resolver<DepartmentDeletedDTO, GetDepartmentDTO>;
};

export const DepartmentFieldResolvers: FieldResolvers = {
  Department: {
    // Find all employees in a department
    async employees(department: Department): Promise<Employee[]> {
      const employeeRepository = AppDataSource.getRepository(Employee);
      return employeeRepository.find({
        where: { department: { id: department.id } },
      });
    },
  },
};

export const DepartmentQueries: Queries = {
  // Find all employees
  async departments(): Promise<Department[]> {
    const department = AppDataSource.getRepository(Department);
    return department.find();
  },

  // Find one department
  async department(_, { id }: GetDepartmentDTO): Promise<Department> {
    const departmentRepository =
      AppDataSource.getRepository<Department>(Department);
    const department = await departmentRepository.findOneBy({ id });
    if (!department) throw new UserInputError("Department not found");
    return department;
  },
};

export const DepartmentMutations: Mutations = {
  // Create department
  async createDepartment(
    _: unknown,
    { data }: { data: CreateDepartmentDTO }
  ): Promise<Department> {
    const departmentRepository =
      AppDataSource.getRepository<Department>(Department);
    return departmentRepository.save(data);
  },

  // Update department
  async updateDepartment(
    _: unknown,
    { data }: { data: UpdateDepartmentDTO }
  ): Promise<Department> {
    const { id, ...rest } = data;
    const departmentRepository =
      AppDataSource.getRepository<Department>(Department);
    const department = await departmentRepository.findOneBy({ id });
    if (!department) throw new UserInputError("Department not found");
    return departmentRepository.save({ ...department, ...rest });
  },

  // Delete department
  async deleteDepartment(
    _,
    { id }: GetDepartmentDTO
  ): Promise<DepartmentDeletedDTO> {
    const departmentRepository = AppDataSource.getRepository(Department);
    const { affected } = await departmentRepository.delete(id);
    if (affected === 0) throw new UserInputError("Department not found");
    return { id };
  },
};
