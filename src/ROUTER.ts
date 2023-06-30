import { createBrowserRouter, redirect } from "react-router-dom";
import { App } from "./components/App";

export const ROUTER = createBrowserRouter(
  [
    {
      path: "/",
      loader: () => redirect("/000000/ffffff"),
    },
    {
      path: ":pivotColor/:targetColor",
      Component: App,
    },
  ],
  {
    basename: "/tw-nearest/",
  },
);
