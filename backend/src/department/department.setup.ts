import { DataSource } from "typeorm";
import { Department } from "./department.entity";

const DEPARTMENTS = ["Sales", "Engineering", "HR"];

export const initialiseDepartments = async (dataSource: DataSource) => {
  const departmentRepository = dataSource.getRepository(Department);
  await Promise.all(
    DEPARTMENTS.map(async (dep) => {
      const department = await departmentRepository.findOneBy({ name: dep });
      if (!department) {
        await departmentRepository.save({ name: dep });
      }
    })
  );
  console.log("✔ Departments initialised");
};
