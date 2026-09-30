import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Password show / hide
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    if (!email.trim()) {
      alert("Email is required");
      return;
    }

    if (!password.trim()) {
      alert("Password is required");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await fetch(
        "https://campus-lost-and-found-1-8d21.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setShowPassword(false);

        navigate("/login");
      }
    } catch (error) {
      alert("Server connection failed");
    }
  };

  return (
    <div className="register-page">

      {/* =================================================
          BACKGROUND DECORATIONS
          ================================================= */}

      <div className="register-glow register-glow-one"></div>
      <div className="register-glow register-glow-two"></div>


      {/* =================================================
          NAVBAR
          ================================================= */}

      <nav className="register-navbar">

        <Link to="/" className="register-brand">

          <div className="register-brand-icon">
            📦
          </div>

          <div className="register-brand-text">
            <span>Campus</span>
            <span>Lost &amp; Found</span>
          </div>

        </Link>


        <div className="register-nav-links">

          <Link to="/">
            Home
          </Link>

          <Link
            to="/login"
            className="register-nav-login"
          >
            👤 Login
          </Link>

        </div>

      </nav>


      {/* =================================================
          REGISTER AREA
          ================================================= */}

      <main className="register-main">

        <div className="register-card">


          {/* =================================================
              REGISTER ICON
              ================================================= */}

          <div className="register-icon">

            <div className="register-icon-head"></div>

            <div className="register-icon-body"></div>

          </div>


          {/* =================================================
              BADGE
              ================================================= */}

          <div className="register-badge">
            🎓 CAMPUS COMMUNITY
          </div>


          {/* =================================================
              HEADING
              ================================================= */}

          <h1>
            Create Account
          </h1>

          <p className="register-subtitle">
            Join Campus Lost &amp; Found
          </p>


          {/* =================================================
              REGISTER FORM
              ================================================= */}

          <form onSubmit={handleRegister}>


            {/* =================================================
                FULL NAME
                ================================================= */}

            <div className="register-input">

              <label>
                Full Name
              </label>

              <div className="register-input-wrapper">

                <span className="register-input-icon">
                  👤
                </span>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>

            </div>


            {/* =================================================
                EMAIL
                ================================================= */}

            <div className="register-input">

              <label>
                Email Address
              </label>

              <div className="register-input-wrapper">

                <span className="register-input-icon">
                  ✉️
                </span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

            </div>


            {/* =================================================
                PASSWORD
                ================================================= */}

            <div className="register-input">

              <label>
                Password
              </label>

              <div className="register-input-wrapper">

                <span className="register-input-icon">
                  🔒
                </span>


                {/* Password input */}

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />


                {/* =================================================
                    SHOW / HIDE PASSWORD BUTTON
                    ================================================= */}

                <button
                  type="button"
                  className="password-eye"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>


              {/* Password hint */}

              <small className="password-hint">
                Password must contain at least 6 characters
              </small>

            </div>


            {/* =================================================
                CREATE ACCOUNT BUTTON
                ================================================= */}

            <button
              type="submit"
              className="register-main-button"
            >

              <span>
                Create Account
              </span>

              <span>
                →
              </span>

            </button>

          </form>


          {/* =================================================
              LOGIN LINK
              ================================================= */}

          <p className="register-login-text">

            Already have an account?{" "}

            <Link to="/login">
              Login
            </Link>

          </p>


          {/* =================================================
              BACK TO HOME
              ================================================= */}

          <Link
            to="/"
            className="home-link"
          >
            ← Back to Home
          </Link>

        </div>

      </main>


      {/* =================================================
          FOOTER
          ================================================= */}

      <div className="register-footer">
        © 2026 Campus Lost &amp; Found · Built for Students
      </div>

    </div>
  );
}

export default Register;