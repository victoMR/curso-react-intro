// DarkModeToggle.js
import React from "react";
import "./DarkModeTogle.css";
import { MdWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa6";
import { useDarkMode } from "./DarkModeContext";

function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button className={`DarkMode DarkModeToggle ${darkMode ? "dark" : "light"}`} onClick={toggleDarkMode}>
      {darkMode ? <FaMoon/> : <MdWbSunny />}
    </button>
  );
}

export default DarkModeToggle;
