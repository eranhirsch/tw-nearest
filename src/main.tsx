import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import invariant from "tiny-invariant";
import { ROUTER } from "./ROUTER";
import "./index.css";

const ROOT_ELEMENT_SELECTOR = "#root";

const rootElement = document.querySelector(ROOT_ELEMENT_SELECTOR);
invariant(
  rootElement !== null,
  `Root element couldn't be found in document DOM with selector "${ROOT_ELEMENT_SELECTOR}"`,
);

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={ROUTER} />
  </StrictMode>,
);
