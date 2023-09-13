import { Suspense, useState } from "react";
import EmployeesDatatable from "./components/EmployeesDatatable";
import Button from "./components/Button";
import EmployeesGraph from "./components/EmployeesGraph";
import Loading from "./components/Loading";

function App() {
  const [view, setView] = useState<"Table" | "Graph">("Table");

  const toggleView = () => {
    setView((prev) => (prev === "Table" ? "Graph" : "Table"));
  };

  return (
    <div className="md:container md:my-8 my-4 mx-auto px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-3">
        <div>
          <h1 className="text-2xl font-bold mb-2">Employee Table</h1>
          <p className="opacity-50">
            A list of all the employees in the company.
          </p>
        </div>
        <div>
          <Button onClick={toggleView} ghost>
            Switch to {view === "Table" ? "Graph" : "Table"} View
          </Button>
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        {view === "Table" ? <EmployeesDatatable /> : <EmployeesGraph />}
      </Suspense>
    </div>
  );
}

export default App;
