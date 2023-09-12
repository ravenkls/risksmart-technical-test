import dotenv from "dotenv";
dotenv.config();

import { IResolvers } from "@graphql-tools/utils";
import { ApolloServer } from "@apollo/server";
import { readFileSync } from "fs";
import { startStandaloneServer } from "@apollo/server/standalone";
import path from "path";
import {
  EmployeeMutations,
  EmployeeQueries,
} from "./employee/employee.resolver";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  createApollo4QueryValidationPlugin,
  constraintDirectiveTypeDefs,
} from "graphql-constraint-directive/apollo4";
import {
  DepartmentFieldResolvers,
  DepartmentMutations,
  DepartmentQueries,
} from "./department/department.resolver";

const resolvers: IResolvers = {
  ...DepartmentFieldResolvers,
  Query: {
    ...EmployeeQueries,
    ...DepartmentQueries,
  },
  Mutation: {
    ...EmployeeMutations,
    ...DepartmentMutations,
  },
};

const typeDefs = readFileSync(
  path.resolve(__dirname, "./schema.graphql"),
  "utf8"
);

const schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
  resolvers: resolvers,
});

const plugins = [createApollo4QueryValidationPlugin({ schema })];

const server = new ApolloServer({
  schema,
  plugins,
});

startStandaloneServer(server, { listen: { port: 3000 } }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
