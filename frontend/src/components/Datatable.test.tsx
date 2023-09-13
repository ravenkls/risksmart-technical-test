import { render, fireEvent } from "../../test/test-utils";
import Datatable from "./Datatable";

const columns = [
  {
    label: "Name",
    value: (item: any) => item.name,
    align: "left",
  } as const,
  {
    label: "Age",
    value: (item: any) => item.age,
    align: "right",
  } as const,
];

const items = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 20 },
];

describe("Datatable", () => {
  it("renders columns and items", () => {
    const { getByText } = render(<Datatable columns={columns} items={items} />);
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Age")).toBeInTheDocument();
    expect(getByText("Alice")).toBeInTheDocument();
    expect(getByText("Bob")).toBeInTheDocument();
    expect(getByText("Charlie")).toBeInTheDocument();
  });

  it("calls onClick when row is clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Datatable columns={columns} items={items} onClick={handleClick} />
    );
    fireEvent.click(getByText("Alice"));
    expect(handleClick).toHaveBeenCalledWith(items[0]);
  });

  it("renders empty state when items is empty", () => {
    const { getByText } = render(<Datatable columns={columns} items={[]} />);
    expect(getByText("It looks like there's nothing here")).toBeInTheDocument();
  });
});
