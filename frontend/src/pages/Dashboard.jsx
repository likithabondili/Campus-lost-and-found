import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    alert("Logout successful");

    navigate("/login");
  };

  return (
    <div className="dashboard-page">

      {/* =================================================
          NAVBAR
          ================================================= */}

      <header className="dashboard-navbar">

        <Link to="/" className="dashboard-brand">

          <div className="dashboard-brand-icon">
            📦
          </div>

          <div className="dashboard-brand-text">
            <span>Campus</span>
            <span>Lost &amp; Found</span>
          </div>

        </Link>


        <nav className="dashboard-nav">

          <Link to="/dashboard" className="dashboard-nav-active">
            Dashboard
          </Link>

          <Link to="/search-items">
            Find Items
          </Link>

          <button
            className="dashboard-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </nav>

      </header>


      {/* =================================================
          MAIN CONTENT
          ================================================= */}

      <main className="dashboard-main">

        {/* Welcome */}

        <section className="dashboard-welcome">

          <div>

            <div className="dashboard-badge">
              🎓 STUDENT PORTAL
            </div>

            <h1>
              Welcome,{" "}
              <span>{userName}</span> 👋
            </h1>

            <p>
              Find what you lost. Report what you found.
            </p>

          </div>


          <div className="welcome-icon">
            🔍
          </div>

        </section>


        {/* Quick actions heading */}

        <div className="dashboard-section-heading">

          <div>
            <h2>What would you like to do?</h2>

            <p>
              Choose an option to manage campus lost &amp; found items.
            </p>
          </div>

        </div>


        {/* Dashboard Cards */}

        <section className="dashboard-cards">

          {/* Report */}

          <Link
            to="/report-item"
            className="dashboard-card dashboard-card-primary"
          >

            <div className="dashboard-card-top">

              <div className="card-icon">
                ➕
              </div>

              <span className="card-arrow">
                →
              </span>

            </div>

            <h3>
              Report Item
            </h3>

            <p>
              Report a lost or found item and help reconnect it with its owner.
            </p>

            <span className="card-action">
              Report an item →
            </span>

          </Link>


          {/* Lost */}

          <Link
            to="/lost-items"
            className="dashboard-card"
          >

            <div className="dashboard-card-top">

              <div className="card-icon">
                🔍
              </div>

              <span className="card-arrow">
                →
              </span>

            </div>

            <h3>
              Lost Items
            </h3>

            <p>
              Browse items that students have reported as lost.
            </p>

            <span className="card-action">
              View lost items →
            </span>

          </Link>


          {/* Found */}

          <Link
            to="/found-items"
            className="dashboard-card"
          >

            <div className="dashboard-card-top">

              <div className="card-icon">
                📦
              </div>

              <span className="card-arrow">
                →
              </span>

            </div>

            <h3>
              Found Items
            </h3>

            <p>
              View items that have been found around the campus.
            </p>

            <span className="card-action">
              View found items →
            </span>

          </Link>


          {/* Search */}

          <Link
            to="/search-items"
            className="dashboard-card"
          >

            <div className="dashboard-card-top">

              <div className="card-icon">
                🔎
              </div>

              <span className="card-arrow">
                →
              </span>

            </div>

            <h3>
              Search Items
            </h3>

            <p>
              Search and filter all reported lost and found items.
            </p>

            <span className="card-action">
              Search now →
            </span>

          </Link>

        </section>


        {/* Help section */}

        <section className="dashboard-help">

          <div className="help-icon">
            🤝
          </div>

          <div>

            <h3>
              Help your campus community
            </h3>

            <p>
              Found something that belongs to someone else?
              Report it and help return it to its rightful owner.
            </p>

          </div>

          <Link
            to="/report-item"
            className="help-button"
          >
            Report Found Item
            <span>→</span>
          </Link>

        </section>

      </main>


      {/* =================================================
          FOOTER
          ================================================= */}

      <footer className="dashboard-footer">
        © 2026 Campus Lost &amp; Found · Built for Students
      </footer>

    </div>
  );
}

export default Dashboard;