import { useEffect, useState } from "react";
import axios from "axios";

function Trending() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/trending"
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
  
      {trending.map((item, index) => (
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