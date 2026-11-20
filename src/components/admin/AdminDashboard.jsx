
import { useEffect, useState } from "react";
import { LogOut, Users, MessageCircle, Trash2 } from "lucide-react";

import { getRSVPs, deleteRSVP } from "../../services/rsvpService";
import { getAllWishes, deleteWish } from "../../services/wishesService";

import "./Admin.css";

export default function AdminDashboard({ onLogout }) {
  const [rsvps, setRsvps] = useState([]);
  const [wishes, setWishes] = useState([]);

  const [activeTab, setActiveTab] = useState("rsvp");

  const [rsvpLoading, setRsvpLoading] = useState(true);
  const [wishesLoading, setWishesLoading] = useState(true);

  const [rsvpError, setRsvpError] = useState("");
  const [wishesError, setWishesError] = useState("");

  // LOAD RSVP SEPARATELY
  const loadRSVPs = async () => {
    setRsvpLoading(true);
    setRsvpError("");

    try {
      const data = await getRSVPs();
      setRsvps(data);
    } catch (error) {
      console.error("RSVP loading error:", error);

      setRsvpError(
        "Admin belum mempunyai permission untuk membaca RSVP."
      );
    } finally {
      setRsvpLoading(false);
    }
  };

  // LOAD WISHES SEPARATELY
  const loadWishes = async () => {
    setWishesLoading(true);
    setWishesError("");

    try {
      const data = await getAllWishes();
      setWishes(data);
    } catch (error) {
      console.error("Wishes loading error:", error);

      setWishesError(
        error.code === "failed-precondition"
          ? "Wishes index masih belum siap. Sila tunggu sehingga Enabled."
          : "Tidak berjaya memuatkan wishes."
      );
    } finally {
      setWishesLoading(false);
    }
  };

  // LOAD BOTH WITHOUT BLOCKING EACH OTHER
  const loadData = () => {
    loadRSVPs();
    loadWishes();
  };

  useEffect(() => {
    loadData();
  }, []);

  // DELETE RSVP
  const handleDeleteRSVP = async (id) => {
    if (!window.confirm("Delete this RSVP?")) return;

    try {
      await deleteRSVP(id);

      setRsvps((previous) =>
        previous.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Delete RSVP error:", error);
      alert("Unable to delete RSVP. Admin permission is required.");
    }
  };

  // DELETE WISH
  const handleDeleteWish = async (id) => {
    if (!window.confirm("Delete this wish?")) return;

    try {
      await deleteWish(id);

      setWishes((previous) =>
        previous.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Delete wish error:", error);
      alert("Unable to delete wish. Admin permission is required.");
    }
  };

  const attending = rsvps.filter(
    (item) => item.attendance === "Hadir"
  );

  const notAttending = rsvps.filter(
    (item) => item.attendance === "Tidak Hadir"
  );

  const totalGuests = attending.reduce(
    (total, item) => total + Number(item.guests || 0),
    0
  );

  const handleLogout = () => {
    sessionStorage.removeItem("weddingAdminAccess");
    onLogout();
  };

  return (
    <section className="admin-dashboard">

      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">WEDDING MANAGEMENT</p>
          <h1>Guestbook Dashboard</h1>
          <p>Aina & Hakim · 12 June 2027</p>
        </div>

        <button className="admin-logout" onClick={handleLogout}>
          <LogOut size={16} />
          Logout
        </button>
      </header>

      {/* STATISTICS */}
      <div className="admin-stats">

        <div className="admin-stat-card">
          <Users size={19} />
          <span>Total Responses</span>
          <strong>
            {rsvpLoading ? "..." : rsvpError ? "—" : rsvps.length}
          </strong>
        </div>

        <div className="admin-stat-card">
          <span>Attending</span>
          <strong>
            {rsvpLoading ? "..." : rsvpError ? "—" : attending.length}
          </strong>
        </div>

        <div className="admin-stat-card">
          <span>Not Attending</span>
          <strong>
            {rsvpLoading ? "..." : rsvpError ? "—" : notAttending.length}
          </strong>
        </div>

        <div className="admin-stat-card">
          <span>Total Guests (Pax)</span>
          <strong>
            {rsvpLoading ? "..." : rsvpError ? "—" : totalGuests}
          </strong>
        </div>

      </div>

      {/* CONTENT */}
      <div className="admin-content">

        <div className="admin-tabs">

          <button
            className={activeTab === "rsvp" ? "active" : ""}
            onClick={() => setActiveTab("rsvp")}
          >
            <Users size={16} />
            RSVP ({rsvps.length})
          </button>

          <button
            className={activeTab === "wishes" ? "active" : ""}
            onClick={() => setActiveTab("wishes")}
          >
            <MessageCircle size={16} />
            Wishes ({wishes.length})
          </button>

        </div>

        {/* RSVP TAB */}
        {activeTab === "rsvp" && (
          <div className="admin-list">

            <div className="admin-list-heading">
              <h2>Guest Responses</h2>
              <button onClick={loadRSVPs}>Refresh</button>
            </div>

            {rsvpLoading ? (
              <p className="admin-loading">Loading RSVP...</p>
            ) : rsvpError ? (
              <p className="admin-empty">{rsvpError}</p>
            ) : rsvps.length === 0 ? (
              <p className="admin-empty">No RSVP responses yet.</p>
            ) : (
              rsvps.map((item) => (
                <div className="admin-record" key={item.id}>

                  <div className="admin-record-info">
                    <h3>{item.name}</h3>
                    <p>
                      {item.attendance} · {item.guests || 0} pax
                    </p>
                  </div>

                  <div className="admin-record-actions">

                    <span
                      className={
                        item.attendance === "Hadir"
                          ? "status-present"
                          : "status-absent"
                      }
                    >
                      {item.attendance}
                    </span>

                    <button
                      className="admin-delete"
                      onClick={() => handleDeleteRSVP(item.id)}
                      aria-label="Delete RSVP"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>
                </div>
              ))
            )}

          </div>
        )}

        {/* WISHES TAB */}
        {activeTab === "wishes" && (
          <div className="admin-list">

            <div className="admin-list-heading">
              <h2>Guest Wishes</h2>
              <button onClick={loadWishes}>Refresh</button>
            </div>

            {wishesLoading ? (
              <p className="admin-loading">Loading wishes...</p>
            ) : wishesError ? (
              <p className="admin-empty">{wishesError}</p>
            ) : wishes.length === 0 ? (
              <p className="admin-empty">No wishes yet.</p>
            ) : (
              wishes.map((item) => (
                <div
                  className="admin-record wish-record"
                  key={item.id}
                >

                  <div className="admin-record-info">
                    <h3>{item.name}</h3>
                    <p>{item.message}</p>
                  </div>

                  <button
                    className="admin-delete"
                    onClick={() => handleDeleteWish(item.id)}
                    aria-label="Delete wish"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>
              ))
            )}

          </div>
        )}

      </div>
    </section>
  );
}
