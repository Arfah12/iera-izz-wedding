
import { useState } from "react";
import { startBackgroundMusic } from "../services/backgroundMusic";
import "./CameraOpening.css";

export default function CameraOpening({ polaroidPhoto1, onStartExperience }) {
  const [captured, setCaptured] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleCapture = () => {
    if (captured) return;

    setCaptured(true);

    // Start on the user's direct gesture; browsers block delayed autoplay.
    startBackgroundMusic().catch((error) => {
      console.log("Background music could not start:", error);
    });

    // Play shutter sound
    const shutterAudio = new Audio("/assets/audio/shutter.mp3");
    shutterAudio.volume = 0.7;

    shutterAudio.play().catch((error) => {
      console.log("Shutter audio could not play:", error);
    });

    // Show Polaroid after 700ms
    setTimeout(() => {
      setShowPhoto(true);

      // Wait 3 seconds after Polaroid appears
      setTimeout(() => {
        setFinished(true);

        // Enter wedding invitation
        setTimeout(() => {
          onStartExperience?.();
        }, 3000);
      }, 3000);
    }, 700);
  };

  return (
    <main className="camera-opening">
      {captured && <div className="camera-flash-overlay" />}

      <div className="camera-scene">
        <p className="camera-eyebrow">
          A MOMENT TO REMEMBER
        </p>

        <h1 className="camera-title">
          Before the <em>forever</em> begins
        </h1>

        <div
          className={`vintage-camera ${
            captured ? "camera-captured" : ""
          }`}
        >
          <div className="camera-viewfinder">
            <span />
          </div>

          <div className="camera-brand">
            WARKAHKASIH
          </div>

          <div className="camera-flash">
            <span />
          </div>

          <div className="camera-lens">
            <div className="lens-ring">
              <div className="lens-inner">
                <div className="lens-glass" />
              </div>
            </div>
          </div>

          <div className="camera-details">
            <span className="camera-indicator" />
            <span className="camera-label">
              INSTANT FILM
            </span>
          </div>

          <div className="camera-slot" />

          {/* SNAP HERE HINT */}
        <div className="camera-shutter-hint">
  <span className="snap-text">← TAP HERE</span>

</div>

          {/* SHUTTER BUTTON */}
          <button
            className="camera-shutter"
            onClick={handleCapture}
            disabled={captured}
            aria-label="Take a photograph"
          />
        </div>

        {/* POLAROID PHOTO */}
        <div
          className={`polaroid-print ${
            showPhoto ? "print-visible" : ""
          }`}
        >
          <div className="polaroid-image">
            <img src={polaroidPhoto1} alt="The couple" />
          </div>

          <p>Our beautiful beginning</p>
        </div>

        {/* INSTRUCTION */}
        <p className="camera-instruction">
          {!captured
            ? "PRESS THE SHUTTER TO BEGIN"
            : !showPhoto
              ? "DEVELOPING YOUR MOMENT..."
              : "A BEAUTIFUL MEMORY TO KEEP"}
        </p>

        {finished && (
          <p className="camera-transition-text">
            OUR STORY BEGINS...
          </p>
        )}
      </div>

      <div className="camera-footer">
        <span>EST. 2027</span>
        <span>A LOVE STORY IN MONOCHROME</span>
      </div>
    </main>
  );
}
