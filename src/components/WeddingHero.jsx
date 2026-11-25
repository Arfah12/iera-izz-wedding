
import "./WeddingHero.css";
import { weddingData } from "../config/weddingData";

export default function WeddingHero() {
  return (
    <section className="wedding-hero">

      {/* Blurred background */}
      <div className="hero-image-wrapper">
        <img
          className="hero-background-blur"
          src={weddingData.heroPhoto}
          alt=""
        />

        {/* Original full image */}
        <img
          className="hero-background"
          src={weddingData.heroPhoto}
          alt="Wedding portrait"
        />
      </div>

      {/* Dark overlay */}
      <div className="hero-overlay" />

      {/* Main content */}
      <div className="hero-content">
        <p className="hero-eyebrow">
          TOGETHER WITH THEIR FAMILIES
        </p>

        <h1 className="hero-names">
          {weddingData.brideNameShort}
          <span>&</span>
          {weddingData.groomNameShort}
        </h1>

        <div className="hero-divider" />

        <p className="hero-date">
          {weddingData.weddingDateDisplay}
        </p>

        <p className="hero-description">
          INVITE YOU TO CELEBRATE THEIR WEDDING
        </p>
      </div>

      {/* Bottom information */}
      <div className="hero-bottom">
        <span>WARKAHKASIH</span>
        <span>SCROLL TO DISCOVER ↓</span>
        <span>2026</span>
      </div>

    </section>
  );
}
