import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import invariant from "tiny-invariant";
import { ROUTER } from "./ROUTER.ts";
import "./index.css";
import { RouterProvider } from "react-router-dom";

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
