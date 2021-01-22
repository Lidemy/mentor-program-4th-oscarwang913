/* eslint-disable quotes */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from "@testing-library/react";
import App from "./components/App/App";

test("renders learn react link", () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  // eslint-disable-next-line react/jsx-filename-extension
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
