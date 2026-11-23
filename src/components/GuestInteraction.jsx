
import { useState } from "react";
import RSVP from "./RSVP";
import Wishes from "./Wishes";
import "./GuestInteraction.css";

export default function GuestInteraction() {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <section className="guest-interaction">
        <div className="guest-background">
          <img
            src="/assets/couple/rsvp-wallpaper.jpg"
            alt="Wedding memories"
          />
        </div>

        <div className="guest-overlay" />

        <div className="guest-content">
          <p className="guest-eyebrow">
            A MOMENT TO REMEMBER
          </p>

          <h2 className="guest-title">
            A Little Note
            <br />
            <span>From You</span>
          </h2>

          <p className="guest-description">
            We would be delighted to celebrate this special day with you. Kindly confirm your attendance by 8 January 2027 and leave us a heartfelt message
          </p>

          <div className="guest-buttons">
            <button
              className="guest-button guest-button-dark"
              onClick={() => setActiveModal("rsvp")}
            >
              <span>01</span>
              RSVP
              <small>Confirm Attendance</small>
            </button>

            <button
              className="guest-button guest-button-light"
              onClick={() => setActiveModal("wishes")}
            >
              <span>02</span>
              Wishes
              <small>Leave a Message</small>
            </button>
          </div>

          <p className="guest-footer">
            WITH LOVE, WARKAHKASIH
          </p>
        </div>
      </section>

      {activeModal && (
        <div
          className="guest-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="guest-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="guest-modal-close"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>

            {activeModal === "rsvp" && <RSVP />}
            {activeModal === "wishes" && <Wishes />}
          </div>
        </div>
      )}
    </>
  );
}
