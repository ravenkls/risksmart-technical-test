import Modal from "./Modal";
import { GetEmployeesQuery } from "../gql/graphql";
import FormField from "./FormField";
import { useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  employee?: GetEmployeesQuery["employees"][number];
};

function EmployeeForm({ isOpen, setOpen }: Props) {
  const { register } = useForm();

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} title="Employee Form">
      <form className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <FormField
            id="name"
            label="First Name"
            {...register("firstName")}
            placeholder="Enter first name"
          />
          <FormField
            id="surname"
            label="Last Name"
            {...register("lastName")}
            placeholder="Enter last name"
          />
        </div>
        <FormField
          id="email"
          label="Email Address"
          {...register("email")}
          placeholder="Enter email address"
        />
      </form>
    </Modal>
  );
}

export default EmployeeForm;
