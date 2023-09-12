/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateDepartment = {
  name: Scalars['String']['input'];
};

export type CreateEmployee = {
  department?: InputMaybe<Scalars['Int']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type Department = {
  __typename?: 'Department';
  employees: Array<Employee>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type DepartmentDeleted = {
  __typename?: 'DepartmentDeleted';
  id: Scalars['Int']['output'];
};

export type Employee = {
  __typename?: 'Employee';
  department?: Maybe<Department>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
};

export type EmployeeDeleted = {
  __typename?: 'EmployeeDeleted';
  id: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDepartment: Department;
  createEmployee: Employee;
  deleteDepartment: DepartmentDeleted;
  deleteEmployee: EmployeeDeleted;
  updateDepartment: Department;
  updateEmployee: Employee;
};


export type MutationCreateDepartmentArgs = {
  data: CreateDepartment;
};


export type MutationCreateEmployeeArgs = {
  data: CreateEmployee;
};


export type MutationDeleteDepartmentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteEmployeeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateDepartmentArgs = {
  data: UpdateDepartment;
};


export type MutationUpdateEmployeeArgs = {
  data: UpdateEmployee;
};

export type Query = {
  __typename?: 'Query';
  department: Department;
  departments: Array<Department>;
  employee: Employee;
  employees: Array<Employee>;
};


export type QueryDepartmentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryEmployeeArgs = {
  id: Scalars['Int']['input'];
};

export type UpdateDepartment = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEmployee = {
  department?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type GetEmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEmployeesQuery = { __typename?: 'Query', employees: Array<{ __typename?: 'Employee', id: number, firstName: string, lastName: string, email: string, department?: { __typename?: 'Department', name: string } | null }> };


export const GetEmployeesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEmployees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetEmployeesQuery, GetEmployeesQueryVariables>;