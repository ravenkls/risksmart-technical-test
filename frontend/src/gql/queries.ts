import { gql } from "@apollo/client";

export const UPDATE_EMPLOYEE = gql`
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

export const CREATE_EMPLOYEE = gql`
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

export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    departments {
      id
      name
    }
  }
`;

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
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

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: Int!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;

export const GET_FULL_DEPARTMENTS = gql`
  query GetFullDepartments {
    departments {
      id
      name
      employees {
        id
        firstName
        lastName
      }
    }
  }
`;
