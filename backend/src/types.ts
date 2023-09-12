import { ISchemaLevelResolver } from "@graphql-tools/utils";

export type Resolver<
  TReturn = unknown,
  TArgs = Record<string, unknown>
> = ISchemaLevelResolver<any, any, TArgs, Promise<TReturn>>;
