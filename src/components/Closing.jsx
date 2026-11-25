
import "./Closing.css";
import { weddingData } from "../config/weddingData";

export default function Closing({ onManageGuestbook }) {
  return (
    <section className="closing-section">
      <div className="closing-content">
        <p className="closing-eyebrow">
          THE BEGINNING OF FOREVER
        </p>

        <h2 className="closing-title">
          Until We Meet
          <br />
          <i>Again</i>
        </h2>

        <div className="closing-divider">✦</div>

        <p className="closing-message">
          {weddingData.closingMessage}
        </p>

        <h3 className="closing-names">
          {weddingData.brideNameShort} & {weddingData.groomNameShort}
        </h3>

        <p className="closing-date">
          {weddingData.weddingDateDisplay}
        </p>

        {/* Admin Access */}
        <button
          type="button"
          className="manage-guestbook-button"
          onClick={onManageGuestbook}
        >
          Manage Guestbook
        </button>

        <p className="closing-footer">
          WARKAHKASIH · 2026
        </p>
      </div>
    </section>
  );
}
