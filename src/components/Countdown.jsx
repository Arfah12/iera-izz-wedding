
import { useEffect, useState } from "react";
import "./Countdown.css";
import { weddingData } from "../config/weddingData";

function calculateTimeLeft() {
  const difference =
    new Date(weddingData.weddingDate).getTime() - Date.now();

  if (difference <= 0) return null;

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "DAYS", value: timeLeft?.days ?? 0 },
    { label: "HOURS", value: timeLeft?.hours ?? 0 },
    { label: "MINUTES", value: timeLeft?.minutes ?? 0 },
    { label: "SECONDS", value: timeLeft?.seconds ?? 0 },
  ];

  return (
    <section className="countdown-section">
      <div className="countdown-container">

        <p className="countdown-eyebrow">
          THE BIG DAY IS APPROACHING
        </p>

        <h2 className="countdown-title">
          Counting Down
          <br />
          To Our Forever
        </h2>

        <p className="countdown-subtitle">
          Every moment bring us closer to the beginning of our forever
        </p>

        {timeLeft ? (
          <div className="countdown-grid">
            {units.map((unit) => (
              <div className="countdown-item" key={unit.label}>
                <span className="countdown-number">
                  {String(unit.value).padStart(2, "0")}
                </span>

                <span className="countdown-label">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="countdown-complete">
            TODAY IS THE SPECIAL DAY!
          </p>
        )}

        <div className="countdown-divider" />

        <p className="countdown-date">
          {weddingData.weddingDateDisplay}
        </p>

        <p className="countdown-footer">
          A DAY TO REMEMBER, A LOVE TO CELEBRATE
        </p>

      </div>
    </section>
  );
}
