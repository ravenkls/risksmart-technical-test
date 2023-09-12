import { gql, useSuspenseQuery } from "@apollo/client";
import React, { useState } from "react";
import Datatable from "./Datatable";
import { Employee, GetEmployeesQuery } from "../gql/graphql";
import EmployeeForm from "./EmployeeForm";

const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      firstName
      lastName
      email
      department {
        name
      }
    }
  }
`;

function EmployeesDatatable() {
  const { data } = useSuspenseQuery<GetEmployeesQuery>(GET_EMPLOYEES);
  const [formIsOpen, setFormOpen] = useState(false);
  const [employee, setEmployee] =
    useState<GetEmployeesQuery["employees"][number]>();

  const handleRowClick = (item: GetEmployeesQuery["employees"][number]) => {
    setFormOpen(true);
    setEmployee(item);
  };

  return (
    <div>
      <EmployeeForm
        isOpen={formIsOpen}
        setOpen={setFormOpen}
        employee={employee}
      />
      <Datatable
        items={data.employees}
        columns={[
          {
            label: "Name",
            value: (item) => `${item.firstName} ${item.lastName}`,
          },
          { label: "Email", value: (item) => item.email },
          {
            label: "Department",
            value: (item) => item.department?.name ?? "",
          },
        ]}
        onClick={handleRowClick}
      />
    </div>
  );
}

export default EmployeesDatatable;
