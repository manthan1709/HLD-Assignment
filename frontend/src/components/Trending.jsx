import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Trending() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/trending`
      );

      setTrending(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="trending-card">
      <h2 className="trending-title">
        🔥 Trending Searches
      </h2>

      {trending.map((item) => (
        <div
          key={item._id}
          className="trending-item"
        >
          🔥 {item.query}
        </div>
      ))}
    </div>
  );
}

export default Trending;