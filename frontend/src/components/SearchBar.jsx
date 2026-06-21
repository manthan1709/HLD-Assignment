import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [recentSearches, setRecentSearches] =
    useState([]);

  useEffect(() => {
    const recent =
      JSON.parse(
        localStorage.getItem(
          "recentSearches"
        )
      ) || [];

    setRecentSearches(recent);
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        setLoading(true);

        const res = await axios.get(
          `${API_URL}/suggest?q=${debouncedQuery}`
        );

        setSuggestions(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      await axios.post(
        `${API_URL}/search`,
        {
          query,
        }
      );

      const existing =
        JSON.parse(
          localStorage.getItem(
            "recentSearches"
          )
        ) || [];

      const updated = [
        query.trim().toLowerCase(),
        ...existing.filter(
          (item) => item !== query
        ),
      ].slice(0, 5);

      localStorage.setItem(
        "recentSearches",
        JSON.stringify(updated)
      );

      setRecentSearches(updated);

      setSuggestions([]);

      alert("Search Submitted Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-card">
      <div className="input-wrapper">
        <span className="search-icon">
          🔍
        </span>

        <input
          className="search-input"
          type="text"
          placeholder="Search anything..."
          value={query}
          onChange={handleChange}
        />
      </div>

      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      <div className="suggestions">
        {suggestions.map((item) => (
          <div
            key={item._id}
            className="suggestion-item"
            onClick={() => {
              setQuery(item.query);
              setSuggestions([]);
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >
              <span>
                🔍 {item.query}
              </span>

              <span
                style={{
                  opacity: 0.7,
                  fontSize: "12px",
                }}
              >
                Suggestion
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        className="search-btn"
        onClick={handleSearch}
      >
        Search
      </button>

      {recentSearches.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>🕒 Recent Searches</h3>

          {recentSearches.map(
            (item) => (
              <div
                key={item}
                className="suggestion-item"
                onClick={() =>
                  setQuery(item)
                }
              >
                {item}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;