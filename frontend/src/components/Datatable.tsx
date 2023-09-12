import { ComponentProps, useMemo, useState } from "react";
import { MdExpandLess } from "react-icons/md";

type SortConfig = {
  column: number;
  direction: "asc" | "desc";
};

type Props<T extends Record<string, any>> = {
  columns: {
    label: string;
    value: (item: T) => React.ReactNode;
    expand?: boolean;
  }[];
  items: T[];
  onClick?: (item: T) => void;
};

function Datatable<T extends Record<string, any>>({
  columns,
  items,
  onClick,
}: Props<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: 0,
    direction: "asc",
  });

  const handleSort = (column: number) => {
    setSortConfig((prev) => {
      return prev.column === column
        ? {
            ...prev,
            direction: prev.direction === "asc" ? "desc" : "asc",
          }
        : {
            column,
            direction: "asc",
          };
    });
  };

  const sortedItems = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      return (
        columns[sortConfig.column].value(a)?.toString() ?? ""
      ).localeCompare(columns[sortConfig.column].value(b)?.toString() ?? "");
    });
    return sortConfig.direction === "asc" ? sorted : sorted.reverse();
  }, [items, sortConfig, columns]);

  return (
    <table className="w-full rounded overflow-hidden">
      <thead className="bg-primary-100">
        <tr>
          {columns.map((column, colIndex) => (
            <th
              className={
                "text-left p-2 border-b-2 border-primary-500 font-normal" +
                (column.expand ? "w-full" : "")
              }
              key={column.label}
            >
              <button
                onClick={() => handleSort(colIndex)}
                className={`flex items-center gap-2 ${
                  sortConfig.column === colIndex
                    ? "font-semibold"
                    : "font-normal"
                }`}
              >
                {column.label}
                {sortConfig.column === colIndex && (
                  <MdExpandLess
                    className={`ease-in-out duration-300 ${
                      sortConfig.direction === "asc" ? "rotate-180" : "rotate-0"
                    }`}
                  />
                )}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedItems.map((item, i) => (
          <tr
            key={i}
            onClick={() => onClick?.(item)}
            className={`${onClick ? "hover:bg-primary-50 cursor-pointer" : ""}
               ${i % 2 === 1 ? "bg-gray-50" : " "}`}
          >
            {columns.map((column, i) => (
              <td
                className={
                  "p-2 " +
                  (i === 0 ? "opacity-100 " : "opacity-50 ") +
                  (column.expand ? "w-full " : " ")
                }
                key={column.label}
              >
                {column.value(item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Datatable;
