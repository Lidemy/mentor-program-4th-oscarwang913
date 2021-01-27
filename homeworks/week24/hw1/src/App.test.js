/* eslint-disable react/jsx-filename-extension */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
