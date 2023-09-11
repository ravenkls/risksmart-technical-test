import { Department } from "../department/department.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @ManyToOne(() => Department, (department) => department.employees, {
    eager: true,
    nullable: true,
  })
  department: Department | null;
}
