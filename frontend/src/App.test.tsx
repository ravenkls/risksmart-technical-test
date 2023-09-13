// import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import App from "./App";
// import EmployeesDatatable from "./components/EmployeesDatatable";
// import EmployeesGraph from "./components/EmployeesGraph";

// Mock child components
jest.mock("./components/EmployeesDatatable", () => {
  return () => <div data-testid="datatable">Datatable Mock</div>;
});

jest.mock("./components/EmployeesGraph", () => {
  return () => <div data-testid="graph">Graph Mock</div>;
});

describe("App", () => {
  test("renders table by default", () => {
    render(<App />);
    expect(screen.getByTestId("datatable")).toBeInTheDocument();
  });

  test("switches view when button clicked", async () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Switch to Graph View/i));

    await waitFor(() => {
      expect(screen.getByTestId("graph")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Switch to Table View/i));

    await waitFor(() => {
      expect(screen.getByTestId("datatable")).toBeInTheDocument();
    });
  });
});
