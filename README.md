# RiskSmart Technical Test

This project is an attempt at completing the technical test as described below.

>
>For this test, we will be excluding all cloud and CICD aspects, so we can focus on some core skills. We want you to show us what you're capable of, and we will not be marking the test against a set criteria. We want you to think, pivot, and be creative, just as we do every day.
>
> Create a single-page application (SPA) that  lists employees within a company in formatted table, retrieved from a GraphQL endpoint.
>
> Allow editing of the row in a pop-up form and update the data source.
> 
> Think in a product mindset and consider what features the app should have.
>

## Structure

This repo is split into 2 projects, a GraphQL backend that uses Apollo, and a SPA using React with Vite.

## How to setup

To setup the project, there is a docker-compose.yml file in each of the frontend and backend directories. You should be able to run these simply like so

```sh
cd frontend
docker compose up -d --build
cd ../backend
docker compose up -d --build
```

If you have any issues setting up the project, please get in touch with me on [LinkedIn](https://www.linkedin.com/in/kristian-smith1) or by contacting me using any of the contact methods in my GitHub profile. (or creating an issue!)

**There are also further, more detailed instructions in each of the projects respectively**

## About the project

The implementation of the project is a simple page that displays a table of employees. Employees can also belong to a department in the company. For now, the departments are premade in the API and there are no interfaces to create new ones, however it would be fairly straightforward to do so.

The web app might seem fairly simple, however, I also implemented a graphical view that you can view the employees in, which structures them by department. This gives people a clearer view of the organisation as a whole. You can see these 2 views in the screenshots provided below.

As for time, I spent roughly 8ish hours on this project in total.

### Table View
<img src="https://i.imgur.com/bZpIzGt.png" />

### Graph View
<img src="https://i.imgur.com/fGp0Psp.png" />

### Mobile View

The user interface also rearranges itself to accommodate smaller viewports

<img src="https://i.imgur.com/vfJ9c1S.png" />

And for the graph view too

<img src="https://i.imgur.com/cd889I9.png" />