import "dotenv/config";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProviderWrapper } from './context/auth.context' // Adjust the import path as necessary
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProviderWrapper>
      <App />
    </AuthProviderWrapper>
  </StrictMode>
);
