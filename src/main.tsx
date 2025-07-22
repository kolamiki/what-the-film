import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { PrimeReactProvider } from "primereact/api";

import GameBoard from "./GameBoard.tsx";
import { App } from "./App.tsx";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./index.css";

declare global {
  interface Window {
    APP_CONFIG: {
      apiOrigin: string;
    };
  }
}

const apiOrigin = window.APP_CONFIG.apiOrigin;

createRoot(document.getElementById("root")!).render(
  <PrimeReactProvider>
    <App apiOrigin={apiOrigin} />
  </PrimeReactProvider>
);
