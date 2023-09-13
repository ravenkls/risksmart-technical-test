import { gql, useSuspenseQuery } from "@apollo/client";
import { useEffect, useMemo, useRef, useState } from "react";
import { GetFullDepartmentsQuery } from "../gql/graphql";
import { Chart } from "chart.js";
import EmployeeGraphPoint from "./EmployeeGraphPoint";
import Loading from "./Loading";
import { GET_FULL_DEPARTMENTS } from "../gql/queries";

function EmployeesGraph() {
  const { data } = useSuspenseQuery<GetFullDepartmentsQuery>(
    GET_FULL_DEPARTMENTS,
    {
      fetchPolicy: "network-only",
    }
  );
  const chart = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart>();
  const [loading, setLoading] = useState(false);

  const nodes = useMemo(() => {
    const nodes = [
      { name: "RiskSmart", type: "company" },
      ...data.departments.map((d) => ({
        name: d.name,
        parent: 0,
        type: "department",
      })),
      ...data.departments.flatMap((d, i) =>
        d.employees.map((e) => ({
          name: `${e.firstName} ${e.lastName}`,
          parent: i + 1,
          type: "employee",
        }))
      ),
    ];

    return [...nodes];
  }, [data]);

  useEffect(() => {
    if (chart.current && nodes.length > 0 && !chartInstance && !loading) {
      setLoading(true);
      setTimeout(() => {
        setChartInstance(
          new Chart(chart.current!.getContext("2d")!, {
            type: "forceDirectedGraph",
            data: {
              labels: ["RiskSmart"],
              datasets: [
                {
                  data: nodes,
                  pointStyle: EmployeeGraphPoint as () => HTMLCanvasElement,
                },
              ],
            },
            options: {
              plugins: {
                legend: {
                  display: false,
                },
              },
              maintainAspectRatio: false,
              simulation: {
                forces: {
                  center: true,
                  collide: false,
                  link: true,
                  manyBody: true,
                  x: false,
                  y: false,
                  radial: false,
                },
              },
              layout: {
                padding: 50,
              },
              animation: {
                onComplete() {
                  setLoading(false);
                },
              },
            },
          })
        );
      }, 100);
    }
  }, [nodes.length, chartInstance, nodes, loading]);

  return (
    <div className="p-2 rounded border-gray-100 border-2">
      {loading ? <Loading /> : null}
      <canvas ref={chart} className={loading ? "hidden" : ""} />
    </div>
  );
}

export default EmployeesGraph;
