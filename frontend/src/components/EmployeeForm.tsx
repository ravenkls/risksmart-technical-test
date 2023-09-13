import Modal from "./Modal";
import {
  CreateEmployee,
  Department,
  Employee,
  GetDepartmentsQuery,
  GetEmployeesQuery,
  MutationCreateEmployeeArgs,
  MutationUpdateEmployeeArgs,
  UpdateEmployee,
} from "../gql/graphql";
import FormField from "./FormField";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";

type Props = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  employee?: GetEmployeesQuery["employees"][number] | null;
};

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($data: UpdateEmployee!) {
    updateEmployee(data: $data) {
      id
      firstName
      lastName
      email
      department {
        id
        name
      }
    }
  }
`;

const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($data: CreateEmployee!) {
    createEmployee(data: $data) {
      id
      firstName
      lastName
      email
      department {
        id
        name
      }
    }
  }
`;

const GET_DEPARTMENTS = gql`
  query GetDepartments {
    departments {
      id
      name
    }
  }
`;

function EmployeeForm({ isOpen, setOpen, employee }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Employee>({
    defaultValues: { ...employee },
  });
  const client = useApolloClient();
  const { data } = useQuery<GetDepartmentsQuery>(GET_DEPARTMENTS);
  const [updateEmployee] = useMutation<
    UpdateEmployee,
    MutationUpdateEmployeeArgs
  >(UPDATE_EMPLOYEE);
  const [createEmployee] = useMutation<
    CreateEmployee,
    MutationCreateEmployeeArgs
  >(CREATE_EMPLOYEE, {
    onCompleted: () =>
      client.refetchQueries({
        include: ["GetEmployees", "GetFullDepartments"],
      }),
  });

  useEffect(
    () =>
      reset(
        employee ?? {
          firstName: "",
          lastName: "",
          email: "",
          department: null,
        }
      ),
    [employee, reset]
  );

  const onSubmit = handleSubmit(async (data) => {
    if (employee) {
      await updateEmployee({
        variables: {
          data: {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            department: data.department
              ? {
                  id: data.department.id,
                }
              : null,
          },
        },
      });
    } else {
      await createEmployee({
        variables: {
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            department: data.department
              ? {
                  id: data.department.id,
                }
              : null,
          },
        },
      });
    }
    setOpen(false);
  });

  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      title="Employee Form"
      onConfirm={onSubmit}
    >
      <form className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <FormField
            id="name"
            label="First Name"
            {...register("firstName", {
              minLength: 1,
              required: "First name is required",
            })}
            placeholder="Enter first name"
            error={errors.firstName?.message}
          />
          <FormField
            id="surname"
            label="Last Name"
            {...register("lastName", {
              minLength: 1,
              required: "Last name is required",
            })}
            placeholder="Enter last name"
            error={errors.lastName?.message}
          />
        </div>
        <FormField
          id="email"
          label="Email Address"
          {...register("email", {
            minLength: 1,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
            required: "Email is required",
          })}
          placeholder="Enter email address"
          error={errors.email?.message}
        />
        <Controller
          name="department"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormField
              id="department"
              options={data?.departments.map((d) => d.name) ?? []}
              label="Department"
              onChange={(e) => {
                onChange(
                  data?.departments.find((d) => d.name === e.target.value) ??
                    null
                );
              }}
              value={
                data?.departments.find((d) => d.name === value?.name)?.name ??
                ""
              }
              placeholder="Select department"
              error={errors.department?.message}
            />
          )}
        />
      </form>
    </Modal>
  );
}

export default EmployeeForm;
