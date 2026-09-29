import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const [stats, setStats] = useState({
    totalItems: 0,
    lostItems: 0,
    foundItems: 0,
    claimedItems: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/items");

        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }

        const items = await response.json();

        setStats({
          totalItems: items.length,
          lostItems: items.filter((item) => item.type === "lost").length,
          foundItems: items.filter((item) => item.type === "found").length,
          claimedItems: items.filter(
            (item) => item.status === "claimed"
          ).length,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");

    alert("Logout successful");
    navigate("/login");
  };

  return (
    <div className="admin-page">

      {/* =================================================
          NAVBAR
          ================================================= */}

      <header className="admin-navbar">

        <Link to="/" className="admin-brand">

          <div className="admin-brand-icon">
            📦
          </div>

          <div className="admin-brand-text">
            <span>Campus</span>
            <span>Lost &amp; Found</span>
          </div>

        </Link>


        <nav className="admin-nav">

          <Link to="/admin" className="admin-nav-active">
            Admin Dashboard
          </Link>

          <Link to="/search-items">
            Search Items
          </Link>

          <button
            className="admin-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </nav>

      </header>


      {/* =================================================
          MAIN
          ================================================= */}

      <main className="admin-main">

        {/* Welcome */}

        <section className="admin-welcome">

          <div className="admin-welcome-content">

            <div className="admin-badge">
              🛡️ ADMIN PORTAL
            </div>

            <h1>
              Welcome,{" "}
              <span>{userName}</span> 👋
            </h1>

            <p>
              Manage campus lost and found items from one place.
            </p>

          </div>


          <div className="admin-welcome-icon">
            🛡️
          </div>

        </section>


        {/* =================================================
            STATISTICS
            ================================================= */}

        <section className="admin-stats-section">

          <div className="admin-section-heading">

            <div>
              <h2>Overview</h2>

              <p>
                Current campus lost &amp; found activity
              </p>
            </div>

          </div>


          <div className="admin-stats">

            {/* Total */}

            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                📦
              </div>

              <div className="admin-stat-content">

                <span>
                  Total Items
                </span>

                <strong>
                  {stats.totalItems}
                </strong>

                <small>
                  All reported items
                </small>

              </div>

            </div>


            {/* Lost */}

            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                🔍
              </div>

              <div className="admin-stat-content">

                <span>
                  Lost Items
                </span>

                <strong>
                  {stats.lostItems}
                </strong>

                <small>
                  Items reported lost
                </small>

              </div>

            </div>


            {/* Found */}

            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                📦
              </div>

              <div className="admin-stat-content">

                <span>
                  Found Items
                </span>

                <strong>
                  {stats.foundItems}
                </strong>

                <small>
                  Items reported found
                </small>

              </div>

            </div>


            {/* Claimed */}

            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                ✓
              </div>

              <div className="admin-stat-content">

                <span>
                  Claimed Items
                </span>

                <strong>
                  {stats.claimedItems}
                </strong>

                <small>
                  Successfully claimed
                </small>

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            MANAGEMENT
            ================================================= */}

        <section className="admin-actions">

          <div className="admin-section-heading">

            <div>
              <h2>Management</h2>

              <p>
                Manage and explore reported campus items
              </p>
            </div>

          </div>


          <div className="admin-action-grid">

            {/* Lost */}

            <Link
              to="/lost-items"
              className="admin-action-card"
            >

              <div className="admin-action-top">

                <div className="admin-action-icon">
                  🔍
                </div>

                <span className="admin-action-arrow">
                  →
                </span>

              </div>

              <h3>
                Manage Lost Items
              </h3>

              <p>
                View and manage items reported as lost.
              </p>

              <span className="admin-card-link">
                View lost items →
              </span>

            </Link>


            {/* Found */}

            <Link
              to="/found-items"
              className="admin-action-card"
            >

              <div className="admin-action-top">

                <div className="admin-action-icon">
                  📦
                </div>

                <span className="admin-action-arrow">
                  →
                </span>

              </div>

              <h3>
                Manage Found Items
              </h3>

              <p>
                View and manage items reported as found.
              </p>

              <span className="admin-card-link">
                View found items →
              </span>

            </Link>


            {/* Search */}

            <Link
              to="/search-items"
              className="admin-action-card"
            >

              <div className="admin-action-top">

                <div className="admin-action-icon">
                  🔎
                </div>

                <span className="admin-action-arrow">
                  →
                </span>

              </div>

              <h3>
                Search Items
              </h3>

              <p>
                Search and filter all reported items.
              </p>

              <span className="admin-card-link">
                Search now →
              </span>

            </Link>


            {/* Student Dashboard */}

            <Link
              to="/dashboard"
              className="admin-action-card"
            >

              <div className="admin-action-top">

                <div className="admin-action-icon">
                  🏠
                </div>

                <span className="admin-action-arrow">
                  →
                </span>

              </div>

              <h3>
                Student Dashboard
              </h3>

              <p>
                Open the student dashboard and student tools.
              </p>

              <span className="admin-card-link">
                Open dashboard →
              </span>

            </Link>

          </div>

        </section>


        {/* =================================================
            ADMIN INFO
            ================================================= */}

        <section className="admin-info">

          <div className="admin-info-icon">
            💡
          </div>

          <div>

            <h3>
              Keep the campus community connected
            </h3>

            <p>
              Review reported items and help students
              reconnect with their belongings.
            </p>

          </div>

        </section>

      </main>


      {/* =================================================
          FOOTER
          ================================================= */}

      <footer className="admin-footer">
        © 2026 Campus Lost &amp; Found · Admin Management Portal
      </footer>

    </div>
  );
}

export default AdminDashboard;