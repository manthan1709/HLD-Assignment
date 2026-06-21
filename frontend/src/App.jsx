import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Trending from "./components/Trending";
import "./index.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="app-container">

      <button
        className="theme-btn"
        onClick={() =>
          setDarkMode(!darkMode)
        }
      >
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

      <h1 className="title">
        SearchFlow
      </h1>

      <p className="subtitle">
        Distributed Search Typeahead Engine
      </p>

      <SearchBar />

      <Trending />
    </div>
  );
}

export default App;