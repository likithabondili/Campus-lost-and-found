import { useState } from "react";
import { Link } from "react-router-dom";
import "./SearchItems.css";

function SearchItems() {
  const [type, setType] = useState("");
  const [itemName, setItemName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  const [items, setItems] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();

      if (type) {
        params.append("type", type);
      }

      if (itemName) {
        params.append("itemName", itemName);
      }

      if (location) {
        params.append("location", location);
      }

      if (status) {
        params.append("status", status);
      }

      const response = await fetch(
        `http://localhost:5000/api/items/search/filter?${params.toString()}`
      );

      const data = await response.json();

      setItems(data);
      setSearched(true);
    } catch (error) {
      alert("Failed to search items");
    }
  };

  const handleClear = () => {
    setType("");
    setItemName("");
    setLocation("");
    setStatus("");
    setItems([]);
    setSearched(false);
  };

  return (
    <div className="search-page">
      <header className="search-navbar">
        <Link to="/" className="search-brand">
          <div className="search-brand-icon">📦</div>

          <div className="search-brand-text">
            <span>Campus</span>
            <span>Lost &amp; Found</span>
          </div>
        </Link>

        <nav className="search-nav">
          <Link to="/dashboard">Dashboard</Link>

          <Link to="/lost-items">
            Lost Items
          </Link>

          <Link to="/found-items">
            Found Items
          </Link>

          <Link
            to="/search-items"
            className="search-nav-active"
          >
            Search
          </Link>
        </nav>
      </header>

      <main className="search-main">
        <section className="search-heading">
          <div>
            <div className="search-badge">
              🔎 SEARCH ITEMS
            </div>

            <h1>Search &amp; Filter</h1>

            <p>
              Find lost and found items across your campus.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="search-dashboard-button"
          >
            ← Dashboard
          </Link>
        </section>

        <section className="search-card">
          <div className="search-card-header">
            <div className="search-card-icon">
              🔍
            </div>

            <div>
              <h2>Find an Item</h2>

              <p>
                Use the filters below to find a specific item.
              </p>
            </div>
          </div>

          <div className="search-form">
            <div className="search-input">
              <label>Item Type</label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">All Items</option>
                <option value="lost">Lost Items</option>
                <option value="found">Found Items</option>
              </select>
            </div>

            <div className="search-input">
              <label>Item Name</label>

              <input
                type="text"
                placeholder="Example: Wallet"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>

            <div className="search-input">
              <label>Location</label>

              <input
                type="text"
                placeholder="Example: Library"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="search-input">
              <label>Status</label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="claimed">Claimed</option>
              </select>
            </div>
          </div>

          <div className="search-buttons">
            <button
              className="search-button"
              onClick={handleSearch}
            >
              🔍 Search Items
            </button>

            <button
              className="clear-button"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </section>

        {searched && (
          <section className="search-results">
            <div className="results-heading">
              <div>
                <div className="results-badge">
                  RESULTS
                </div>

                <h2>Search Results</h2>
              </div>

              <div className="results-count">
                {items.length}{" "}
                {items.length === 1 ? "item" : "items"}
              </div>
            </div>

            {items.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">
                  🔍
                </div>

                <h3>No Items Found</h3>

                <p>
                  Try changing your search filters.
                </p>
              </div>
            ) : (
              <div className="search-grid">
                {items.map((item) => (
                  <article
                    className="search-item-card"
                    key={item._id}
                  >
                    <div className="search-item-top">
                      <span
                        className={
                          item.type === "lost"
                            ? "search-item-type search-lost-type"
                            : "search-item-type search-found-type"
                        }
                      >
                        {item.type.toUpperCase()}
                      </span>

                      <span
                        className={
                          item.status === "active"
                            ? "search-item-status active-status"
                            : "search-item-status claimed-status"
                        }
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="search-item-icon">
                      {item.type === "lost"
                        ? "🔍"
                        : "📦"}
                    </div>

                    <h2>{item.itemName}</h2>

                    <p className="search-item-description">
                      {item.description}
                    </p>

                    <div className="search-item-details">
                      <div className="search-item-detail">
                        <span>📍</span>

                        <div>
                          <small>Location</small>

                          <strong>
                            {item.location}
                          </strong>
                        </div>
                      </div>

                      <div className="search-item-detail">
                        <span>📅</span>

                        <div>
                          <small>Date</small>

                          <strong>
                            {new Date(
                              item.date
                            ).toLocaleDateString()}
                          </strong>
                        </div>
                      </div>

                      <div className="search-item-detail">
                        <span>👤</span>

                        <div>
                          <small>Reported By</small>

                          <strong>
                            {item.reportedBy?.name ||
                              "Student"}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/item/${item._id}`}
                      className="search-details-button"
                    >
                      View Details
                      <span>→</span>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="search-footer">
        © 2026 Campus Lost &amp; Found · Helping Students
        Reconnect
      </footer>
    </div>
  );
}

export default SearchItems;