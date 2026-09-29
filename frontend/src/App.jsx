import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ReportItem from "./pages/ReportItem";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import ItemDetails from "./pages/ItemDetails";
import SearchItems from "./pages/SearchItems";
import ProtectedRoute from "./ProtectedRoute";

function Home() {
  return (
    <div className="home-page">

      {/* NAVBAR */}
      <nav className="home-navbar">

        <Link to="/" className="brand">
          <div className="brand-icon">📦</div>

          <div className="brand-text">
            <span>Campus</span>
            <span>Lost & Found</span>
          </div>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/search-items">Find Items</Link>
          <Link to="/report-item">Report Lost</Link>
          <Link to="/login" className="nav-login">
            👤 Login
          </Link>
        </div>

      </nav>

      {/* HERO */}
      <main className="home-hero">

        <section className="hero-content">

          <div className="hero-badge">
            🎓 CAMPUS COMMUNITY
          </div>

          <h1>
            Lost
            <br />
            Something?
          </h1>

          <div className="hero-gradient-line">
            <span></span>
            <span></span>
          </div>

          <h2>
            Find what you lost. Report what
            <br />
            you found.
          </h2>

          <p>
            Campus Lost & Found makes it easy for students to
            report lost belongings, share found items, and help
            return valuable things to their rightful owners.
          </p>

          <div className="hero-buttons">

            <Link to="/search-items" className="primary-hero-button">
              🔍 Find an Item
              <span>→</span>
            </Link>

            <Link to="/report-item" className="secondary-hero-button">
              📦 Report an Item
            </Link>

          </div>

          <div className="hero-features">
            ✓ Simple&nbsp;&nbsp; ✓ Secure&nbsp;&nbsp; ✓ Built for Students
          </div>

        </section>

        {/* HERO CARD */}
        <section className="hero-preview">

          <div className="preview-card">

            <div className="preview-top">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="preview-icon">
              🔍
            </div>

            <h2>
              Lost Things,
              <br />
              Found Their Way
            </h2>

            <p>
              Helping students reconnect with their belongings.
            </p>

            <div className="preview-item">
              <div className="preview-item-icon">🎒</div>
              <div>
                <strong>Lost Backpack</strong>
                <small>Reported recently</small>
              </div>
            </div>

            <div className="preview-item">
              <div className="preview-item-icon">📱</div>
              <div>
                <strong>Found Phone</strong>
                <small>Waiting for owner</small>
              </div>
            </div>

            <div className="returned-badge">
              ✓ Returned
            </div>

          </div>

        </section>

      </main>

      {/* FEATURE CARDS */}
      <section className="home-features">

        <div className="feature-card">
          <div className="feature-icon">🔍</div>

          <div>
            <h3>Find Lost Items</h3>
            <p>
              Search through reported items quickly and easily.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📦</div>

          <div>
            <h3>Report Found Items</h3>
            <p>
              Help someone get their belongings back.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🤝</div>

          <div>
            <h3>Reconnect Owners</h3>
            <p>
              Make the campus community more helpful.
            </p>
          </div>
        </div>

      </section>

      <div className="home-footer">
        © 2026 Helping Campus Students · Lost & Found · What matters.
      </div>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report-item"
          element={
            <ProtectedRoute>
              <ReportItem />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lost-items"
          element={
            <ProtectedRoute>
              <LostItems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/found-items"
          element={
            <ProtectedRoute>
              <FoundItems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search-items"
          element={
            <ProtectedRoute>
              <SearchItems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/item/:id"
          element={
            <ProtectedRoute>
              <ItemDetails />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;