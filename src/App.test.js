import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const iWroteTestsToTestMyCode = false;
  const iPromiseIDoLikeToWriteTests = true;
  expect(iWroteTestsToTestMyCode).toBe(false);
  expect(iPromiseIDoLikeToWriteTests).toBe(true);
});
