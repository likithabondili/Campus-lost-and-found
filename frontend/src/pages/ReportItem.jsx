import { useState } from "react";
import { Link } from "react-router-dom";
import "./ReportItem.css";

function ReportItem() {
  const [type, setType] = useState("lost");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      return;
    }

    if (!itemName.trim()) {
      alert("Item name is required");
      return;
    }

    if (!description.trim()) {
      alert("Description is required");
      return;
    }

    if (!location.trim()) {
      alert("Location is required");
      return;
    }

    if (!date) {
      alert("Date is required");
      return;
    }

    try {
      const response = await fetch(
        "http://http://campus-lost-and-found-1-8d21.onrender.com/api/items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type,
            itemName,
            description,
            location,
            date,
            reportedBy: userId,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        setItemName("");
        setDescription("");
        setLocation("");
        setDate("");
        setType("lost");
      }
    } catch (error) {
      alert("Server connection failed");
    }
  };

  return (
    <div className="report-page">

      {/* =================================================
          NAVBAR
          ================================================= */}

      <header className="report-navbar">

        <Link to="/" className="report-brand">

          <div className="report-brand-icon">
            📦
          </div>

          <div className="report-brand-text">
            <span>Campus</span>
            <span>Lost &amp; Found</span>
          </div>

        </Link>


        <nav className="report-nav">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/search-items">
            Find Items
          </Link>

          <Link
            to="/report-item"
            className="report-nav-active"
          >
            Report Item
          </Link>

        </nav>

      </header>


      {/* =================================================
          MAIN
          ================================================= */}

      <main className="report-main">

        {/* LEFT INFORMATION */}

        <section className="report-intro">

          <div className="report-badge">
            📦 CAMPUS COMMUNITY
          </div>

          <h1>
            Report an
            <br />
            <span>Item</span>
          </h1>

          <div className="report-gradient-line">
            <span></span>
            <span></span>
          </div>

          <h2>
            Help someone find what
            <br />
            they lost.
          </h2>

          <p>
            Share the details of a lost or found item
            and help reconnect it with its rightful owner.
          </p>


          {/* INFO CARDS */}

          <div className="report-info-list">

            <div className="report-info-item">

              <div className="report-info-icon">
                🔍
              </div>

              <div>
                <strong>
                  Lost something?
                </strong>

                <small>
                  Tell the campus community what you're looking for.
                </small>
              </div>

            </div>


            <div className="report-info-item">

              <div className="report-info-icon">
                🤝
              </div>

              <div>
                <strong>
                  Found something?
                </strong>

                <small>
                  Report it and help return it to its owner.
                </small>
              </div>

            </div>


            <div className="report-info-item">

              <div className="report-info-icon">
                🔒
              </div>

              <div>
                <strong>
                  Simple &amp; secure
                </strong>

                <small>
                  Your report is connected to your campus account.
                </small>
              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            REPORT FORM CARD
            ================================================= */}

        <section className="report-card">

          <div className="report-card-icon">
            📦
          </div>

          <div className="report-card-heading">

            <h2>
              Item Details
            </h2>

            <p>
              Enter the information below
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* ITEM TYPE */}

            <div className="report-input">

              <label>
                Item Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="lost">
                  Lost Item
                </option>

                <option value="found">
                  Found Item
                </option>
              </select>

            </div>


            {/* ITEM NAME */}

            <div className="report-input">

              <label>
                Item Name
              </label>

              <input
                type="text"
                placeholder="Example: Black Wallet"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />

            </div>


            {/* DESCRIPTION */}

            <div className="report-input">

              <label>
                Description
              </label>

              <textarea
                placeholder="Describe the item clearly..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              ></textarea>

            </div>


            {/* LOCATION */}

            <div className="report-input">

              <label>
                Location
              </label>

              <input
                type="text"
                placeholder="Example: College Library"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

            </div>


            {/* DATE */}

            <div className="report-input">

              <label>
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="report-button"
            >
              <span>📦</span>
              Report Item
              <span>→</span>
            </button>

          </form>


          <Link
            to="/dashboard"
            className="report-back"
          >
            ← Back to Dashboard
          </Link>

        </section>

      </main>


      {/* FOOTER */}

      <footer className="report-footer">
        © 2026 Campus Lost &amp; Found · Built for Students
      </footer>

    </div>
  );
}

export default ReportItem;