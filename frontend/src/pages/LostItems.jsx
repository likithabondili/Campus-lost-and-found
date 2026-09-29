import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LostItems.css";
function LostItems() {
  const [items, setItems] = useState([]);

  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch("http://localhost:5000/api/items/search/filter?type=lost")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch(() => {
        alert("Failed to load lost items");
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
        `http://localhost:5000/api/items/${itemId}`,
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
    <div className="lost-page">

      {/* =================================================
          NAVBAR
          ================================================= */}

      <header className="lost-navbar">

        <Link to="/" className="lost-brand">

          <div className="lost-brand-icon">
            📦
          </div>

          <div className="lost-brand-text">
            <span>Campus</span>
            <span>Lost &amp; Found</span>
          </div>

        </Link>


        <nav className="lost-nav">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link
            to="/lost-items"
            className="lost-nav-active"
          >
            Lost Items
          </Link>

          <Link to="/found-items">
            Found Items
          </Link>

          <Link to="/search-items">
            Search
          </Link>

        </nav>

      </header>


      {/* =================================================
          MAIN
          ================================================= */}

      <main className="lost-main">

        {/* PAGE HEADING */}

        <section className="lost-heading">

          <div>

            <div className="lost-badge">
              🔍 LOST ITEMS
            </div>

            <h1>
              Lost Items
            </h1>

            <p>
              Browse items reported lost by students
              across the campus.
            </p>

          </div>


          <Link
            to="/dashboard"
            className="lost-dashboard-button"
          >
            ← Dashboard
          </Link>

        </section>


        {/* ITEM COUNT */}

        <div className="lost-count-bar">

          <div className="lost-count-icon">
            📦
          </div>

          <div>
            <strong>
              {items.length}
            </strong>

            <span>
              {items.length === 1
                ? " lost item reported"
                : " lost items reported"}
            </span>
          </div>

        </div>


        {/* =================================================
            ITEMS
            ================================================= */}

        {items.length === 0 ? (

          <section className="lost-empty">

            <div className="lost-empty-icon">
              🔍
            </div>

            <h2>
              No Lost Items
            </h2>

            <p>
              There are currently no lost items reported.
            </p>

            <Link
              to="/report-item"
              className="lost-empty-button"
            >
              Report an Item →
            </Link>

          </section>

        ) : (

          <section className="lost-grid">

            {items.map((item) => (

              <article
                className="lost-card"
                key={item._id}
              >

                {/* CARD TOP */}

                <div className="lost-card-top">

                  <span className="lost-type">
                    LOST
                  </span>

                  <span
                    className={
                      item.status === "active"
                        ? "lost-status active-status"
                        : "lost-status claimed-status"
                    }
                  >
                    {item.status}
                  </span>

                </div>


                {/* ICON */}

                <div className="lost-item-icon">
                  🎒
                </div>


                {/* NAME */}

                <h2>
                  {item.itemName}
                </h2>


                {/* DESCRIPTION */}

                <p className="lost-description">
                  {item.description}
                </p>


                {/* DETAILS */}

                <div className="lost-details">

                  <div className="lost-detail">

                    <span className="lost-detail-icon">
                      📍
                    </span>

                    <div>
                      <small>
                        Location
                      </small>

                      <strong>
                        {item.location}
                      </strong>
                    </div>

                  </div>


                  <div className="lost-detail">

                    <span className="lost-detail-icon">
                      📅
                    </span>

                    <div>
                      <small>
                        Date
                      </small>

                      <strong>
                        {new Date(
                          item.date
                        ).toLocaleDateString()}
                      </strong>
                    </div>

                  </div>


                  <div className="lost-detail">

                    <span className="lost-detail-icon">
                      👤
                    </span>

                    <div>
                      <small>
                        Reported By
                      </small>

                      <strong>
                        {item.reportedBy?.name || "Student"}
                      </strong>
                    </div>

                  </div>

                </div>


                {/* VIEW DETAILS */}

                <Link
                  to={`/item/${item._id}`}
                  className="lost-details-button"
                >
                  View Details
                  <span>→</span>
                </Link>


                {/* ADMIN DELETE */}

                {userRole === "admin" && (

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="lost-delete-button"
                  >
                    🗑️ Delete Item
                  </button>

                )}

              </article>

            ))}

          </section>

        )}

      </main>


      {/* FOOTER */}

      <footer className="lost-footer">
        © 2026 Campus Lost &amp; Found · Helping Students Reconnect
      </footer>

    </div>
  );
}

export default LostItems;