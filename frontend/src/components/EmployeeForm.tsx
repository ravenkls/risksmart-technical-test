import Modal from "./Modal";
import {
  CreateEmployee,
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
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
  CREATE_EMPLOYEE,
  GET_DEPARTMENTS,
  GET_EMPLOYEES,
  GET_FULL_DEPARTMENTS,
  UPDATE_EMPLOYEE,
} from "../gql/queries";

type Props = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  employee?: GetEmployeesQuery["employees"][number] | null;
};

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
        include: [GET_EMPLOYEES, GET_FULL_DEPARTMENTS],
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
    console.log(data);
    if (employee) {
      await updateEmployee({
        variables: {
          data: {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            department: data.department?.id
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
            department: data.department?.id
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
