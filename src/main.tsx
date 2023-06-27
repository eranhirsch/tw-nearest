/* eslint-disable unicorn/filename-case -- This is defined by vite! */

import { StrictMode } from "react";
import { App } from "./components/App.tsx";
import "./index.css";
import { createRoot } from "react-dom/client";
import invariant from "tiny-invariant";

const ROOT_ELEMENT_SELECTOR = "#root";

const rootElement = document.querySelector(ROOT_ELEMENT_SELECTOR);
invariant(
  rootElement !== null,
  `Root element couldn't be found in document DOM with selector "${ROOT_ELEMENT_SELECTOR}"`,
);

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
