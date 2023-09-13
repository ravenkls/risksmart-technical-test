import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

const mocks: readonly MockedResponse<
  Record<string, any>,
  Record<string, any>
>[] = [];

// eslint-disable-next-line react-refresh/only-export-components
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { customRender as render };
