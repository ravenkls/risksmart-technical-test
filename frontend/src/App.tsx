import { Suspense } from "react";
import EmployeesDatatable from "./components/EmployeesDatatable";

function App() {
  return (
    <div className="md:container md:my-8 my-4 mx-auto px-4">
      <h1 className="text-2xl font-bold mb-2">Employee Ledger</h1>
      <p className="mb-8 opacity-50">
        A list of all the employees in the company.
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <EmployeesDatatable />
      </Suspense>
    </div>
  );
}

export default App;
