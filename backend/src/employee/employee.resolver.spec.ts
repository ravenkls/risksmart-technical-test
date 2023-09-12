import { Department } from "../department/department.entity";
import { Employee } from "./employee.entity";
import { EmployeeQueries, EmployeeMutations } from "./employee.resolver";
import { UserInputError } from "apollo-server-errors";

// Mock data
const mockEmployee: Employee = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@risksmart.com",
  department: null,
};

const mockDepartment: Department = {
  id: 1,
  name: "Engineering",
  employees: [],
};

const mockEmployeeRepo = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

const mockDepartmentRepo = {
  findOneBy: jest.fn(),
};

// Mocking AppDataSource
jest.mock("../data-source", () => ({
  AppDataSource: {
    getRepository: jest
      .fn()
      .mockImplementation((entity: any) =>
        entity === Employee ? mockEmployeeRepo : mockDepartmentRepo
      ),
  },
}));

describe("Employee Resolvers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Query Tests
  describe("EmployeeQueries", () => {
    it("fetches all employees", async () => {
      mockEmployeeRepo.find.mockResolvedValue([mockEmployee]);

      //@ts-expect-error -- it's cleaner to call the resolver directly
      const result = await EmployeeQueries.employees();
      expect(result).toEqual([mockEmployee]);
    });

    it("fetches one employee", async () => {
      mockEmployeeRepo.findOneBy.mockResolvedValue(mockEmployee);

      //@ts-expect-error -- it's cleaner to call the resolver directly
      const result = await EmployeeQueries.employee(null, { id: 1 });
      expect(result).toEqual(mockEmployee);
    });

    it("throws error if employee not found", async () => {
      mockEmployeeRepo.findOneBy.mockResolvedValue(null);

      //@ts-expect-error -- it's cleaner to call the resolver directly
      await expect(EmployeeQueries.employee(null, { id: 1 })).rejects.toThrow(
        UserInputError
      );
    });
  });

  // Mutation Tests
  describe("EmployeeMutations", () => {
    it("creates employee", async () => {
      mockEmployeeRepo.save.mockResolvedValue(mockEmployee);

      //@ts-expect-error -- it's cleaner to call the resolver directly
      const result = await EmployeeMutations.createEmployee(null, {
        data: mockEmployee,
      });
      expect(result).toEqual(mockEmployee);
    });

    it("creates employee with department", async () => {
      mockEmployeeRepo.save.mockResolvedValue(mockEmployee);
      mockDepartmentRepo.findOneBy.mockResolvedValue(mockDepartment);

      //@ts-expect-error -- it's cleaner to call the resolver directly
      const result = await EmployeeMutations.createEmployee(null, {
        data: { ...mockEmployee, department: 1 },
      });
      expect(result).toEqual(mockEmployee);
    });

    it("updates employee", async () => {
      mockEmployeeRepo.findOneBy.mockResolvedValue(mockEmployee);
      mockEmployeeRepo.save.mockResolvedValue({
        ...mockEmployee,
        name: "Jane",
      });

      //@ts-expect-error -- it's cleaner to call the resolver directly
      const result = await EmployeeMutations.updateEmployee(null, {
        data: { id: 1, name: "Jane" },
      });
      expect(result).toEqual({ ...mockEmployee, name: "Jane" });
    });

    it("updates employee with department", async () => {
      mockEmployeeRepo.findOneBy.mockResolvedValue(mockEmployee);
      mockEmployeeRepo.save.mockResolvedValue({
        ...mockEmployee,
        name: "Jane",
      });
      mockDepartmentRepo.findOneBy.mockResolvedValue(mockDepartment);

      //@ts-expect-error -- it's cleaner to call the resolver directly
      const result = await EmployeeMutations.updateEmployee(null, {
        data: { id: 1, name: "Jane", department: 1 },
      });
      expect(result).toEqual({ ...mockEmployee, name: "Jane" });
    });

    it("removes employee department when supplying it with null value", async () => {
      mockEmployeeRepo.findOneBy.mockResolvedValue(mockEmployee);
      mockEmployeeRepo.save.mockResolvedValue({
        ...mockEmployee,
        department: null,
      });

      //@ts-expect-error -- it's cleaner to call the resolver directly
      const result = await EmployeeMutations.updateEmployee(null, {
        data: { id: 1, name: "Jane", department: null },
      });
      expect(result).toEqual({ ...mockEmployee, department: null });
    });

    it("throws error when updating non-existent employee", async () => {
      mockEmployeeRepo.findOneBy.mockResolvedValue(null);

      await expect(
        //@ts-expect-error -- it's cleaner to call the resolver directly
        EmployeeMutations.updateEmployee(null, {
          data: { id: 1, name: "Jane" },
        })
      ).rejects.toThrow(UserInputError);
    });

    it("deletes employee", async () => {
      mockEmployeeRepo.delete.mockResolvedValue({ affected: 1 });

      //@ts-expect-error -- it's cleaner to call the resolver directly
      const result = await EmployeeMutations.deleteEmployee(null, { id: 1 });
      expect(result).toEqual({ id: 1 });
    });

    it("throws error when deleting non-existent employee", async () => {
      mockEmployeeRepo.delete.mockResolvedValue({ affected: 0 });

      await expect(
        //@ts-expect-error -- it's cleaner to call the resolver directly
        EmployeeMutations.deleteEmployee(null, { id: 1 })
      ).rejects.toThrow(UserInputError);
    });
  });
});
