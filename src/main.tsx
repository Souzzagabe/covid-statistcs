import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./contexts/useAppContext.tsx";

import './lib/i18n.ts'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
