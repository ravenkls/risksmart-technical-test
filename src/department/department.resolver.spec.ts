import { Employee } from "../employee/employee.entity";
import { Department } from "./department.entity";
import {
  DepartmentQueries,
  DepartmentMutations,
  DepartmentFieldResolvers,
} from "./department.resolver";
import { UserInputError } from "apollo-server-errors";

// Mock data
const mockDepartment: Department = {
  id: 1,
  name: "Engineering",
  employees: [],
};

const mockEmployee: Employee = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@risksmart.com",
  department: mockDepartment,
};

const mockDepartmentRepo = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

const mockEmployeeRepo = {
  find: jest.fn(),
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

describe("Department Resolvers", () => {
  describe("DepartmentFieldResolvers", () => {
    it("fetches employees in a department", async () => {
      mockEmployeeRepo.find.mockResolvedValue([mockEmployee]);
      //@ts-expect-error
      const result = await DepartmentFieldResolvers.Department.employees(
        mockDepartment
      );
      expect(mockEmployeeRepo.find).toHaveBeenCalledWith({
        where: { department: { id: mockDepartment.id } },
      });
      expect(result).toEqual([mockEmployee]);
    });
  });

  describe("DepartmentQueries", () => {
    it("fetches all departments", async () => {
      mockDepartmentRepo.find.mockResolvedValue([mockDepartment]);

      //@ts-expect-error
      const result = await DepartmentQueries.departments();
      expect(result).toEqual([mockDepartment]);
    });

    it("fetches one department", async () => {
      mockDepartmentRepo.findOneBy.mockResolvedValue(mockDepartment);

      //@ts-expect-error
      const result = await DepartmentQueries.department(null, { id: 1 });
      expect(result).toEqual(mockDepartment);
    });

    it("throws error if department not found", async () => {
      mockDepartmentRepo.findOneBy.mockResolvedValue(null);

      await expect(
        //@ts-expect-error
        DepartmentQueries.department(null, { id: 1 })
      ).rejects.toThrow(UserInputError);
    });
  });

  describe("DepartmentMutations", () => {
    it("creates department", async () => {
      mockDepartmentRepo.save.mockResolvedValue(mockDepartment);

      //@ts-expect-error
      const result = await DepartmentMutations.createDepartment(null, {
        data: mockDepartment,
      });
      expect(result).toEqual(mockDepartment);
    });

    it("updates department", async () => {
      mockDepartmentRepo.findOneBy.mockResolvedValue(mockDepartment);
      mockDepartmentRepo.save.mockResolvedValue({
        ...mockDepartment,
        name: "HR",
      });

      //@ts-expect-error
      const result = await DepartmentMutations.updateDepartment(null, {
        data: { id: 1, name: "HR" },
      });
      expect(result).toEqual({ ...mockDepartment, name: "HR" });
    });

    it("throws error when updating non-existent department", async () => {
      mockDepartmentRepo.findOneBy.mockResolvedValue(null);

      await expect(
        //@ts-expect-error
        DepartmentMutations.updateDepartment(null, {
          data: { id: 1, name: "HR" },
        })
      ).rejects.toThrow(UserInputError);
    });

    it("deletes department", async () => {
      mockDepartmentRepo.delete.mockResolvedValue({ affected: 1 });

      //@ts-expect-error
      const result = await DepartmentMutations.deleteDepartment(null, {
        id: 1,
      });
      expect(result).toEqual({ id: 1 });
    });

    it("throws error when deleting non-existent department", async () => {
      mockDepartmentRepo.delete.mockResolvedValue({ affected: 0 });

      await expect(
        //@ts-expect-error
        DepartmentMutations.deleteDepartment(null, { id: 1 })
      ).rejects.toThrow(UserInputError);
    });
  });
});
