import { render, fireEvent } from "../../test/test-utils";
import Button from "./Button";

describe("Button", () => {
  it("renders children", () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText("Click me")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText("Click me")).toMatchSnapshot();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>
    );
    fireEvent.click(getByText("Click me"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("applies danger styles when danger prop is true", () => {
    const { getByText } = render(<Button danger>Click me</Button>);
    expect(getByText("Click me")).toHaveClass("text-red-600");
    expect(getByText("Click me")).toMatchSnapshot();
  });

  it("applies ghost styles when ghost prop is true", () => {
    const { getByText } = render(<Button ghost>Click me</Button>);
    expect(getByText("Click me")).toHaveClass("bg-white");
    expect(getByText("Click me")).toMatchSnapshot();
  });

  it("applies ghost and danger styles when ghost prop is true", () => {
    const { getByText } = render(
      <Button ghost danger>
        Click me
      </Button>
    );
    expect(getByText("Click me")).toMatchSnapshot();
  });
});
