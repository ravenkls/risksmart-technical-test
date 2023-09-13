import { render, waitFor } from "../../test/test-utils";
import { MockedProvider } from "@apollo/client/testing";
import EmployeeForm from "./EmployeeForm";
import {
  CREATE_EMPLOYEE,
  GET_DEPARTMENTS,
  UPDATE_EMPLOYEE,
} from "../gql/queries";

const mocks = [
  {
    request: {
      query: GET_DEPARTMENTS,
    },
    result: {
      data: {
        departments: [
          { id: 1, name: "Engineering" },
          { id: 2, name: "HR" },
        ],
      },
    },
  },
  {
    request: {
      query: CREATE_EMPLOYEE,
      variables: {
        data: {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          department: { id: 1 },
        },
      },
    },
    result: {
      data: {
        createEmployee: {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          department: { id: 1, name: "Engineering" },
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_EMPLOYEE,
      variables: {
        data: {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          department: { id: 1 },
        },
      },
    },
    result: {
      data: {
        updateEmployee: {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          department: { id: 1, name: "Engineering" },
        },
      },
    },
  },
];

describe("EmployeeForm", () => {
  it("renders without error", async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EmployeeForm isOpen={true} setOpen={() => {}} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText("Employee Form")).toBeInTheDocument();
    });
  });

  it("populates fields with existing employee", async () => {
    const existingEmployee = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      department: { id: "1", name: "Engineering" },
    };

    const { getByPlaceholderText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EmployeeForm
          isOpen={true}
          setOpen={() => {}}
          employee={existingEmployee}
        />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByPlaceholderText("Enter first name")).toHaveValue("John");
      expect(getByPlaceholderText("Enter last name")).toHaveValue("Doe");
      expect(getByPlaceholderText("Enter email address")).toHaveValue(
        "john.doe@example.com"
      );
      expect(getByPlaceholderText("Select department")).toHaveValue(
        "Engineering"
      );
    });
  });
});
