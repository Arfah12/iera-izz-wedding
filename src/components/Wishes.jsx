
import { useState } from "react";
import { addWish } from "../services/wishesService";
import "./Wishes.css";

export default function Wishes({ onSuccess }) {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !wish.trim()) {
      setMessage("Sila lengkapkan nama dan ucapan.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await addWish({
        name: name.trim(),
        message: wish.trim(),
      });

      setName("");
      setWish("");

      // Tutup modal selepas ucapan berjaya dihantar
      onSuccess?.();

    } catch (error) {
      console.error("Wish error:", error);
      setMessage("Ucapan tidak berjaya dihantar. Cuba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="wishes-section">
      <div className="wishes-container">

        <p className="wishes-label">A LITTLE NOTE FOR US</p>

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
          />

          <textarea
            placeholder="Tulis ucapan anda..."
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            maxLength={300}
            rows={3}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "SENDING..." : "SEND WISH"}
          </button>
        </form>

        {message && (
          <p className="wishes-feedback" role="status">
            {message}
          </p>
        )}

      </div>
    </section>
  );
}
