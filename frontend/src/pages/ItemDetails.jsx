import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./ItemDetails.css";

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://http://campus-lost-and-found-1-8d21.onrender.com/api/items/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load item details");
        setLoading(false);
      });
  }, [id]);

  const handleClaim = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://http://campus-lost-and-found-1-8d21.onrender.com/api/items/${id}/claim`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            claimedBy: userId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Item claimed successfully");
        setItem(data.item);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server connection failed");
    }
  };

  if (loading) {
    return (
      <div className="details-page">
        <div className="details-loading">
          <div className="loading-icon">📦</div>
          <h2>Loading Item Details</h2>
          <p>Please wait...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="details-page">
        <div className="details-loading">
          <div className="loading-icon">🔍</div>
          <h2>Item Not Found</h2>
          <p>The requested item could not be found.</p>

          <Link to="/search-items" className="details-back">
            ← Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="details-page">
      <header className="details-navbar">
        <Link to="/" className="details-brand">
          <div className="details-brand-icon">📦</div>

          <div className="details-brand-text">
            <span>Campus</span>
            <span>Lost &amp; Found</span>
          </div>
        </Link>

        <nav className="details-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/lost-items">Lost Items</Link>
          <Link to="/found-items">Found Items</Link>
          <Link to="/search-items">Search</Link>
        </nav>
      </header>

      <main className="details-main">
        <Link
          to={
            item.type === "lost"
              ? "/lost-items"
              : "/found-items"
          }
          className="details-back"
        >
          ← Back to Items
        </Link>

        <section className="details-card">
          <div className="details-top">
            <div
              className={
                item.type === "lost"
                  ? "details-icon lost-details-icon"
                  : "details-icon found-details-icon"
              }
            >
              {item.type === "lost" ? "🔍" : "📦"}
            </div>

            <div className="details-heading">
              <span
                className={
                  item.type === "lost"
                    ? "details-type lost-type"
                    : "details-type found-type"
                }
              >
                {item.type.toUpperCase()}
              </span>

              <h1>{item.itemName}</h1>

              <p>
                Item details and reported information
              </p>
            </div>
          </div>

          <div className="details-status-section">
            <span className="details-label">
              Current Status
            </span>

            <span
              className={
                item.status === "active"
                  ? "details-status active-status"
                  : "details-status claimed-status"
              }
            >
              {item.status === "active"
                ? "● Active"
                : "✓ Claimed"}
            </span>
          </div>

          <div className="details-section">
            <div className="details-section-title">
              <span>📝</span>
              <h3>Description</h3>
            </div>

            <div className="details-description">
              <p>{item.description}</p>
            </div>
          </div>

          <div className="details-section">
            <div className="details-section-title">
              <span>ℹ️</span>
              <h3>Item Information</h3>
            </div>

            <div className="details-info-grid">
              <div className="details-info-box">
                <span>📍</span>

                <div>
                  <small>Location</small>
                  <strong>{item.location}</strong>
                </div>
              </div>

              <div className="details-info-box">
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

              <div className="details-info-box">
                <span>👤</span>

                <div>
                  <small>Reported By</small>

                  <strong>
                    {item.reportedBy?.name || "Student"}
                  </strong>
                </div>
              </div>

              <div className="details-info-box">
                <span>✉️</span>

                <div>
                  <small>Contact</small>

                  <strong>
                    {item.reportedBy?.email ||
                      "Not available"}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {item.status === "active" ? (
            <div className="claim-section">
              <div className="claim-content">
                <div className="claim-icon">🤝</div>

                <div>
                  <h3>Found this item?</h3>

                  <p>
                    If this item belongs to you, you
                    can claim it.
                  </p>
                </div>
              </div>

              <button
                className="claim-button"
                onClick={handleClaim}
              >
                ✓ Claim Item
              </button>
            </div>
          ) : (
            <div className="already-claimed">
              <div className="claimed-icon">✓</div>

              <div>
                <strong>
                  This item has been claimed
                </strong>

                {item.claimedBy && (
                  <p>
                    Claimed by{" "}
                    {item.claimedBy.name}
                  </p>
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="details-footer">
        © 2026 Campus Lost &amp; Found · Helping Students
        Reconnect
      </footer>
    </div>
  );
}

export default ItemDetails;