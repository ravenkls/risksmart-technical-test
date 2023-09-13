/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation UpdateEmployee($data: UpdateEmployee!) {\n    updateEmployee(data: $data) {\n      id\n      firstName\n      lastName\n      email\n      department {\n        id\n        name\n      }\n    }\n  }\n": types.UpdateEmployeeDocument,
    "\n  mutation CreateEmployee($data: CreateEmployee!) {\n    createEmployee(data: $data) {\n      id\n      firstName\n      lastName\n      email\n      department {\n        id\n        name\n      }\n    }\n  }\n": types.CreateEmployeeDocument,
    "\n  query GetDepartments {\n    departments {\n      id\n      name\n    }\n  }\n": types.GetDepartmentsDocument,
    "\n  query GetEmployees {\n    employees {\n      id\n      firstName\n      lastName\n      email\n      department {\n        name\n      }\n    }\n  }\n": types.GetEmployeesDocument,
    "\n  mutation DeleteEmployee($id: Int!) {\n    deleteEmployee(id: $id) {\n      id\n    }\n  }\n": types.DeleteEmployeeDocument,
    "\n  query GetFullDepartments {\n    departments {\n      id\n      name\n      employees {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n": types.GetFullDepartmentsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateEmployee($data: UpdateEmployee!) {\n    updateEmployee(data: $data) {\n      id\n      firstName\n      lastName\n      email\n      department {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateEmployee($data: UpdateEmployee!) {\n    updateEmployee(data: $data) {\n      id\n      firstName\n      lastName\n      email\n      department {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateEmployee($data: CreateEmployee!) {\n    createEmployee(data: $data) {\n      id\n      firstName\n      lastName\n      email\n      department {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateEmployee($data: CreateEmployee!) {\n    createEmployee(data: $data) {\n      id\n      firstName\n      lastName\n      email\n      department {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDepartments {\n    departments {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetDepartments {\n    departments {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEmployees {\n    employees {\n      id\n      firstName\n      lastName\n      email\n      department {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetEmployees {\n    employees {\n      id\n      firstName\n      lastName\n      email\n      department {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteEmployee($id: Int!) {\n    deleteEmployee(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteEmployee($id: Int!) {\n    deleteEmployee(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFullDepartments {\n    departments {\n      id\n      name\n      employees {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFullDepartments {\n    departments {\n      id\n      name\n      employees {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;