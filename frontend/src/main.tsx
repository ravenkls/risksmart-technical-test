import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Chart as ChartJS, LinearScale, PointElement } from "chart.js";
import {
  ForceDirectedGraphController,
  EdgeLine,
  TreeController,
} from "chartjs-chart-graph";

ChartJS.register(
  TreeController,
  ForceDirectedGraphController,
  LinearScale,
  PointElement,
  EdgeLine
);

const client = new ApolloClient({
  uri: "http://localhost:3000/",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
