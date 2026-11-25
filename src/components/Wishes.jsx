
import { useState } from "react";
import { addWish } from "../services/wishesService";
import "./Wishes.css";

export default function Wishes({ onSuccess }) {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !wish.trim()) {
      setSuccess(false);
      setMessage("Sila lengkapkan nama dan ucapan.");
      return;
    }

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      await addWish({
        name: name.trim(),
        message: wish.trim(),
      });

      setName("");
      setWish("");

      setSuccess(true);
      setMessage("Terima kasih! Ucapan anda telah diterima.");

    } catch (error) {
      console.error("Wish error:", error);

      setSuccess(false);
      setMessage("Ucapan tidak berjaya dihantar. Cuba lagi.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="wishes-section">
      <div className="wishes-container">

        <p className="wishes-label">
          A LITTLE NOTE FOR US
        </p>

        <h2 className="wishes-heading">
          Leave A Little Wish
        </h2>

        <p className="wishes-subtitle">
          Titipkan doa dan ucapan buat kami.
        </p>

        <form className="wishes-form" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Nama anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            required
            disabled={loading}
          />

          <textarea
            placeholder="Tulis ucapan anda..."
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            maxLength={300}
            rows={3}
            required
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? "SENDING..." : "SEND WISH"}
          </button>

        </form>

        {message && (
          <p
            className={`wishes-feedback ${success ? "success" : "error"}`}
            role="status"
          >
            {message}
          </p>
        )}

      </div>
    </section>
  );
}
