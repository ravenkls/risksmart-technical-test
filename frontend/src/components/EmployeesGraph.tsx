import { gql, useSuspenseQuery } from "@apollo/client";
import React from "react";
import { GetFullDepartmentsQuery } from "../gql/graphql";

const GET_FULL_DEPARTMENTS = gql`
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
function EmployeesGraph() {
  const { data } =
    useSuspenseQuery<GetFullDepartmentsQuery>(GET_FULL_DEPARTMENTS);

  return <div>{JSON.stringify(data)}</div>;
}

export default EmployeesGraph;
