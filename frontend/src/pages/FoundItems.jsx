import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FoundItems.css";

function FoundItems() {
  const [items, setItems] = useState([]);

  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch("http://http://campus-lost-and-found-1-8d21.onrender.com/api/items/search/filter?type=found")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch(() => {
        alert("Failed to load found items");
      });
  }, []);

  const handleDelete = async (itemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://http://campus-lost-and-found-1-8d21.onrender.com/api/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "x-user-id": userId,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Item deleted successfully");

        setItems((previousItems) =>
          previousItems.filter((item) => item._id !== itemId)
        );
      } else {
        alert(data.message || "Failed to delete item");
      }
    } catch (error) {
      alert("Server error while deleting item");
    }
  };

  return (
    <div className="found-page">
      <header className="found-navbar">
        <Link to="/" className="found-brand">
          <div className="found-brand-icon">📦</div>

          <div className="found-brand-text">
            <span>Campus</span>
            <span>Lost &amp; Found</span>
          </div>
        </Link>

        <nav className="found-nav">
          <Link to="/dashboard">Dashboard</Link>

          <Link to="/lost-items">
            Lost Items
          </Link>

          <Link
            to="/found-items"
            className="found-nav-active"
          >
            Found Items
          </Link>

          <Link to="/search-items">
            Search
          </Link>
        </nav>
      </header>

      <main className="found-main">
        <section className="found-heading">
          <div>
            <div className="found-badge">
              📦 FOUND ITEMS
            </div>

            <h1>Found Items</h1>

            <p>
              Browse items found and reported by students
              across the campus.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="found-dashboard-button"
          >
            ← Dashboard
          </Link>
        </section>

        <div className="found-count-bar">
          <div className="found-count-icon">
            ✓
          </div>

          <div>
            <strong>{items.length}</strong>

            <span>
              {items.length === 1
                ? " found item reported"
                : " found items reported"}
            </span>
          </div>
        </div>

        {items.length === 0 ? (
          <section className="found-empty">
            <div className="found-empty-icon">
              📦
            </div>

            <h2>No Found Items</h2>

            <p>
              There are currently no found items reported.
            </p>

            <Link
              to="/report-item"
              className="found-empty-button"
            >
              Report an Item →
            </Link>
          </section>
        ) : (
          <section className="found-grid">
            {items.map((item) => (
              <article
                className="found-card"
                key={item._id}
              >
                <div className="found-card-top">
                  <span className="found-type">
                    FOUND
                  </span>

                  <span
                    className={
                      item.status === "active"
                        ? "found-status active-status"
                        : "found-status claimed-status"
                    }
                  >
                    {item.status}
                  </span>
                </div>

                <div className="found-item-icon">
                  🎒
                </div>

                <h2>{item.itemName}</h2>

                <p className="found-description">
                  {item.description}
                </p>

                <div className="found-details">
                  <div className="found-detail">
                    <span className="found-detail-icon">
                      📍
                    </span>

                    <div>
                      <small>Location</small>

                      <strong>
                        {item.location}
                      </strong>
                    </div>
                  </div>

                  <div className="found-detail">
                    <span className="found-detail-icon">
                      📅
                    </span>

                    <div>
                      <small>Date</small>

                      <strong>
                        {new Date(
                          item.date
                        ).toLocaleDateString()}
                      </strong>
                    </div>
                  </div>

                  <div className="found-detail">
                    <span className="found-detail-icon">
                      👤
                    </span>

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
                  className="found-details-button"
                >
                  View Details
                  <span>→</span>
                </Link>

                {userRole === "admin" && (
                  <button
                    onClick={() =>
                      handleDelete(item._id)
                    }
                    className="found-delete-button"
                  >
                    🗑️ Delete Item
                  </button>
                )}
              </article>
            ))}
          </section>
        )}
      </main>

      <footer className="found-footer">
        © 2026 Campus Lost &amp; Found · Helping Students
        Reconnect
      </footer>
    </div>
  );
}

export default FoundItems;