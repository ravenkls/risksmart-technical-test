import { render } from "../../test/test-utils";
import Input from "./Input";

describe("Input", () => {
  it("renders correctly", () => {
    const tree = render(<Input />);
    expect(tree).toMatchSnapshot();
  });
});
