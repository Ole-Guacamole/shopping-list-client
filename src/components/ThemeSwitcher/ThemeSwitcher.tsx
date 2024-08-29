import React from "react";
import { useTheme } from "../../context/theme.context"; // Adjust the path as necessary

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="btn btn-primary">
      Switch to {theme === "cupcake" ? "Dracula" : "Cupcake"} Theme
    </button>
  );
};

export default ThemeSwitcher;