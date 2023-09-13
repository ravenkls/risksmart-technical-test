import { render } from "../../test/test-utils";
import Loading from "./Loading";

describe("Loading", () => {
  it("renders correctly", () => {
    const tree = render(<Loading />);
    expect(tree).toMatchSnapshot();
  });
});
