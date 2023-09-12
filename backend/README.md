# RiskSmart Tech Test GraphQL Backend

## About the Project

I've implemented the GraphQL API using Apollo's standalone server. The project also uses Typeorm for database management. There are unit tests for the GraphQL resolvers.

The API manages employees in a database, employees can belong to departments but they can also be department-less.

### Project Structure

The project is structured in a modular way. For example, all features/tests pertaining to employees are separated into their own folder. The GraphQL schema is in it's own file away from the code for clarity.

## Setup

### Quick Start
To set the project up, you should hopefully (🤞) be able to just run `docker compose up` to start the project. Failing that, you can manually build the project using `yarn install` and `yarn start`.

### Extra Information
If you need/want to change the database credentials, those are stored in the `.env` file, this project uses PostgreSQL, however, this can also be changed in the `src/data-source.ts` file

When the project is running, you will be able to navigate to https://localhost:3000/ to view the Apollo Playground.