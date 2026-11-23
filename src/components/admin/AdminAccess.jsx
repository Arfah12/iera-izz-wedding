
import { useState } from "react";
import {
  LockKeyhole,
  ArrowLeft
} from "lucide-react";

import {
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { auth } from "../../services/firebase";
import "./Admin.css";

// Admin credentials mapping
const ADMIN_USERNAME = "admin";
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_UID = "LDN1EMTs47UpSuGAUy3Jcb2oi0T2";

export default function AdminAccess({ onBack, onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (username.trim() !== ADMIN_USERNAME) {
      setError("Invalid username or password.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const result = await signInWithEmailAndPassword(
        auth,
        ADMIN_EMAIL,
        password
      );

      // Verify admin UID
      if (result.user.uid !== ADMIN_UID) {
        await signOut(auth);
        setError("Unauthorized account.");
        return;
      }

      // Login successful
      onSuccess();

    } catch (error) {
      console.error("Admin login error:", error);
      setError("Invalid username or password.");
      setPassword("");

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-access">
      <button
        type="button"
        className="admin-back"
        onClick={onBack}
      >
        <ArrowLeft size={16} />
        Back to Invitation
      </button>

      <div className="admin-login-card">

        <div className="admin-lock-icon">
          <LockKeyhole size={25} />
        </div>

        <p className="admin-eyebrow">
          PRIVATE ACCESS
        </p>

        <h1>Welcome Back</h1>

        <p className="admin-login-description">
          Enter your credentials to manage your wedding guestbook.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            autoComplete="username"
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />

          {error && (
            <p className="admin-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="admin-primary-button"
            disabled={loading}
          >
            {loading ? "PLEASE WAIT..." : "ENTER DASHBOARD"}
          </button>

        </form>

      </div>
    </section>
  );
}
