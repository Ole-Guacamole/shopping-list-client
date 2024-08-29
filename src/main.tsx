import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { ThemeProvider } from "./context/theme.context";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Router>
        <ThemeProvider>
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
        </ThemeProvider>
      </Router>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}