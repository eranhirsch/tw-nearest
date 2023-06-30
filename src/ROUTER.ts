import { createBrowserRouter } from "react-router-dom";
import { App } from "./components/App";

export const ROUTER = createBrowserRouter(
  [
    {
      path: "/",
      Component: App,
    },
  ],
  {
    basename: "/tw-nearest/",
  },
);
