import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClientProvider } from "react-query";
import "./index.css";
import { queryClient } from "./services/QueryClient.ts";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./contexts/useAppContext.tsx";

import './lib/i18n.ts'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
