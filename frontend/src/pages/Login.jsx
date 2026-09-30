import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Email is required");
      return;
    }

    if (!password.trim()) {
      alert("Password is required");
      return;
    }

    try {
      const response = await fetch(
        "https://campus-lost-and-found-1-8d21.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userRole", data.user.role);

        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      alert("Server connection failed");
    }
  };

  return (
    <div className="login-page">

      {/* NAVBAR */}
      <header className="login-navbar">

        <Link to="/" className="login-brand">

          <div className="login-brand-icon">
            📦
          </div>

          <div className="login-brand-text">
            <span>Campus</span>
            <span>Lost &amp; Found</span>
          </div>

        </Link>

        <nav className="login-nav">

          <Link to="/">
            Home
          </Link>

          <Link to="/register" className="login-nav-register">
            Register
          </Link>

        </nav>

      </header>


      {/* BACKGROUND */}
      <main className="login-main">

        <div className="login-glow login-glow-one"></div>
        <div className="login-glow login-glow-two"></div>


        {/* LEFT INFORMATION */}
        <section className="login-info">

          <div className="login-info-badge">
            🎓 CAMPUS COMMUNITY
          </div>

          <h1>
            Welcome
            <br />
            <span>Back!</span>
          </h1>

          <div className="login-gradient-line">
            <span></span>
            <span></span>
          </div>

          <h2>
            Find what you lost.
            <br />
            Help return what you found.
          </h2>

          <p>
            Login to Campus Lost &amp; Found and connect
            with your campus community. Search for lost
            belongings or help someone find theirs.
          </p>

          <div className="login-features">

            <div>
              <span>✓</span>
              Simple to use
            </div>

            <div>
              <span>✓</span>
              Secure access
            </div>

            <div>
              <span>✓</span>
              Built for students
            </div>

          </div>

        </section>


        {/* LOGIN CARD */}
        <section className="login-card">

          {/* ICON */}
          <div className="login-icon">

            <div className="login-icon-head"></div>

            <div className="login-icon-body"></div>

          </div>


          <div className="login-badge">
            🔐 SECURE LOGIN
          </div>


          <h1>
            Welcome Back
          </h1>

          <p className="login-subtitle">
            Login to Campus Lost &amp; Found
          </p>


          {/* FORM */}
          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <div className="login-input-group">

              <label>
                Email Address
              </label>

              <div className="login-input-wrapper">

                <span className="login-input-icon">
                  ✉️
                </span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

            </div>


            {/* PASSWORD */}
            <div className="login-input-group">

              <label>
                Password
              </label>

              <div className="login-input-wrapper">

                <span className="login-input-icon">
                  🔒
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* PASSWORD EYE */}
                <button
                  type="button"
                  className="login-password-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>


            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-submit-button"
            >
              <span>Login</span>
              <span>→</span>
            </button>

          </form>


          {/* REGISTER */}
          <p className="login-register-text">

            Don't have an account?{" "}

            <Link to="/register">
              Register
            </Link>

          </p>


          {/* BACK HOME */}
          <Link
            to="/"
            className="login-back-home"
          >
            ← Back to Home
          </Link>

        </section>

      </main>


      {/* FOOTER */}
      <footer className="login-footer">
        © 2026 Campus Lost &amp; Found · Built for Students
      </footer>

    </div>
  );
}

export default Login;