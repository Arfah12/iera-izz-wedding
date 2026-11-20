
import { useState } from "react";
import { submitRSVP } from "../services/rsvpService";
import "./RSVP.css";

export default function RSVP() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("Hadir");
  const [guests, setGuests] = useState("1");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage("Sila masukkan nama anda.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await submitRSVP({
        name: name.trim(),
        attendance,
        guests: attendance === "Hadir" ? Number(guests) : 0,
      });

      setMessage("Terima kasih! Pengesahan anda telah diterima.");

      setName("");
      setAttendance("Hadir");
      setGuests("1");

    } catch (error) {
      console.error("RSVP error:", error);
      setMessage("Maaf, penghantaran gagal. Sila cuba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rsvp-section">
      <div className="rsvp-box">
        <p className="rsvp-label">KINDLY RESPOND</p>

        <h2 className="rsvp-heading">
          Will You Join Us?
        </h2>

        <p className="rsvp-subtitle">
          Mohon sahkan kehadiran anda.
        </p>

        <form onSubmit={handleSubmit} className="rsvp-form">
          <input
            type="text"
            placeholder="Nama penuh"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            required
          />

          <div className="rsvp-options">
            <button
              type="button"
              className={attendance === "Hadir" ? "selected" : ""}
              onClick={() => setAttendance("Hadir")}
            >
              Hadir
            </button>

            <button
              type="button"
              className={attendance === "Tidak Hadir" ? "selected" : ""}
              onClick={() => setAttendance("Tidak Hadir")}
            >
              Tidak Hadir
            </button>
          </div>

          {attendance === "Hadir" && (
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              aria-label="Jumlah tetamu"
            >
              {[1, 2, 3, 4, 5].map((number) => (
                <option key={number} value={number}>
                  {number} orang
                </option>
              ))}
            </select>
          )}

          <button
            type="submit"
            className="rsvp-button"
            disabled={loading}
          >
            {loading ? "SEDANG MENGHANTAR..." : "HANTAR RSVP"}
          </button>
        </form>

        {message && (
          <p className="rsvp-message" role="status">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
