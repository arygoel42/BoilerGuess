import React, { useState } from "react";
import "../SearchBar.css"; // Import a separate CSS file for styling
import { useNavigate } from "react-router";

const SearchBar = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const searchResults = async (searchQuery: string) => {
    if (!searchQuery) {
      setUsers([]); // Clear suggestions if search query is empty
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/game/search/${searchQuery}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to fetch search results");

      const users = await response.json();
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    searchResults(value);
  };

  const handleSelect = (username: string) => {
    setQuery(username);
    setUsers([]); // Clear suggestions when user selects an option
    navigate(`/player/${username}`);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <input
          type="text"
          placeholder="Search for a player..."
          value={query}
          onChange={handleChange}
          className="search-input"
          color="Black"
        />
      </form>

      {loading && <div className="loader">Loading...</div>}

      {users.length > 0 && (
        <ul className="suggestions-dropdown">
          {users.map((user: any) => (
            <li
              key={user._id}
              onClick={() => handleSelect(user.username)}
              className="suggestion-item"
              color="Black"
            >
              {user.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
