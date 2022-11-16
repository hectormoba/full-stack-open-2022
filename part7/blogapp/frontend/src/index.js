import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./components/styled/GlobalStyles";
import theme from "./components/styled/theme";
import store from "./store/Store";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
    <GlobalStyles />
  </Provider>,
  document.getElementById("root")
);
