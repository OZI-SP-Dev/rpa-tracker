import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initializeFileTypeIcons } from "@fluentui/react-file-type-icons";

initializeIcons();
initializeFileTypeIcons();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
