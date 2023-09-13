import { render } from "../../test/test-utils";
import Empty from "./Empty";

describe("Empty", () => {
  it("renders correctly", () => {
    const tree = render(<Empty />);
    expect(tree).toMatchSnapshot();
  });
});
