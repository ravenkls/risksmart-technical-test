import {
  gql,
  useApolloClient,
  useMutation,
  useSuspenseQuery,
} from "@apollo/client";
import React, { useMemo, useState } from "react";
import Datatable from "./Datatable";
import {
  DeleteEmployeeMutation,
  DeleteEmployeeMutationVariables,
  Employee,
  GetEmployeesQuery,
} from "../gql/graphql";
import EmployeeForm from "./EmployeeForm";
import Button from "./Button";
import { MdDelete } from "react-icons/md";
import Modal from "./Modal";
import FormField from "./FormField";

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

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: Int!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;

function EmployeesDatatable() {
  const client = useApolloClient();
  const { data } = useSuspenseQuery<GetEmployeesQuery>(GET_EMPLOYEES);
  const [deleteEmployee] = useMutation<
    DeleteEmployeeMutation,
    DeleteEmployeeMutationVariables
  >(DELETE_EMPLOYEE, {
    onCompleted: () =>
      client.refetchQueries({
        include: ["GetEmployees", "GetFullDepartments"],
      }),
  });
  const [formIsOpen, setFormOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [employee, setEmployee] =
    useState<GetEmployeesQuery["employees"][number]>();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = useMemo(() => {
    if (data.employees) {
      return data.employees.filter((employee) => {
        const fullName = `${employee.firstName} ${employee.lastName}`;
        return (
          fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }
    return [];
  }, [searchQuery, data.employees]);

  const handleRowClick = (item: GetEmployeesQuery["employees"][number]) => {
    setFormOpen(true);
    setEmployee(item);
  };

  const handleDelete = async () => {
    if (employee) await deleteEmployee({ variables: { id: employee.id } });
    setDeleteConfirmation(false);
  };

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <FormField
          id="search"
          placeholder="Search employees..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          onClick={() => {
            setFormOpen(true);
            setEmployee(undefined);
          }}
        >
          Create Employee
        </Button>
      </div>
      <Modal
        isOpen={deleteConfirmation}
        setOpen={setDeleteConfirmation}
        title="Delete Employee"
        onConfirm={handleDelete}
      >
        Delete {employee?.firstName} {employee?.lastName}?
      </Modal>
      <EmployeeForm
        isOpen={formIsOpen}
        setOpen={setFormOpen}
        employee={employee}
      />
      <Datatable
        items={filteredEmployees}
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
          {
            label: "Delete",
            align: "center",
            value: (item) => (
              <Button
                ghost
                danger
                onClick={(e) => {
                  e.stopPropagation();
                  setEmployee(item);
                  setDeleteConfirmation(true);
                }}
              >
                <MdDelete />
              </Button>
            ),
          },
        ]}
        onClick={handleRowClick}
      />
    </div>
  );
}

export default EmployeesDatatable;
