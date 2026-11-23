
import { useState } from "react";
import { submitRSVP } from "../services/rsvpService";
import "./RSVP.css";

export default function RSVP() {
  const [name, setName] = useState("");
  const [side, setSide] = useState("Pihak Lelaki");
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
        side,
        attendance,
        guests: attendance === "Hadir" ? Number(guests) : 0,
      });

      setMessage("Terima kasih! Pengesahan anda telah diterima.");

      setName("");
      setSide("Pihak Lelaki");
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

        <h2 className="rsvp-heading">
          Will You Join Us?
        </h2>

        <p className="rsvp-subtitle">
          RSVP DEADLINE - 8 January 2027
          Kindly respond by this date. Thank you for your cooperation.
        </p>

        <form onSubmit={handleSubmit} className="rsvp-form">

          {/* NAME */}
          <input
            type="text"
            placeholder="Nama penuh"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            required
          />

          {/* BRIDE / GROOM SIDE */}
          <div className="rsvp-side">
          

            <div className="rsvp-options">
              <button
                type="button"
                className={side === "Pihak Lelaki" ? "selected" : ""}
                onClick={() => setSide("Pihak Lelaki")}
              >
                Pihak Lelaki / Groom Family 
              </button>

              <button
                type="button"
                className={side === "Pihak Perempuan" ? "selected" : ""}
                onClick={() => setSide("Pihak Perempuan")}
              >
                Pihak Perempuan / Bride Family
              </button>
            </div>
          </div>

          {/* ATTENDANCE */}
          <div className="rsvp-options">
            <button
              type="button"
              className={attendance === "Hadir" ? "selected" : ""}
              onClick={() => setAttendance("Hadir")}
            >
              Hadir / Attending
            </button>

            <button
              type="button"
              className={attendance === "Tidak Hadir" ? "selected" : ""}
              onClick={() => setAttendance("Tidak Hadir")}
            >
              Tidak Hadir / Unable to Attend
            </button>
          </div>

          {/* NUMBER OF GUESTS */}
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

          {/* SUBMIT */}
          <button
            type="submit"
            className="rsvp-button"
            disabled={loading}
          >
            {loading ? "SEDANG MENGHANTAR..." : "SUBMIT RSVP"}
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
