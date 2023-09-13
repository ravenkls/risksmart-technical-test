import { render, fireEvent } from "@testing-library/react";
import FormField from "./FormField";

describe("FormField", () => {
  it("renders an input field with the correct attributes", () => {
    const { getByLabelText } = render(
      <FormField id="test" name="test" label="Test" placeholder="Test" />
    );
    const input = getByLabelText("Test");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "test");
    expect(input).toHaveAttribute("name", "test");
    expect(input).toHaveAttribute("placeholder", "Test");
  });

  it("renders a select field with the correct attributes and options", () => {
    const { getByLabelText, getByText } = render(
      <FormField
        id="test"
        name="test"
        label="Test"
        options={["Option 1", "Option 2"]}
      />
    );
    const select = getByLabelText("Test");
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("id", "test");
    expect(select).toHaveAttribute("name", "test");
    expect(getByText("Option 1")).toBeInTheDocument();
    expect(getByText("Option 2")).toBeInTheDocument();
  });

  it("displays an error message when the error prop is set", () => {
    const { getByText } = render(
      <FormField id="test" name="test" error="Test error" />
    );
    expect(getByText("Test error")).toBeInTheDocument();
  });

  it("calls the onChange function when the input value changes", () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <FormField id="test" name="test" label="Test" onChange={onChange} />
    );
    const input = getByLabelText("Test");
    fireEvent.change(input, { target: { value: "Test value" } });
    expect(onChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("hides the label tag when the label prop is not present", () => {
    const { queryByLabelText } = render(
      <FormField id="test" name="test" placeholder="Test" />
    );
    expect(queryByLabelText("Test")).not.toBeInTheDocument();
  });
});
