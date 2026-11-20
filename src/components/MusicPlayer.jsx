
import { useEffect, useRef, useState } from "react";
import "./MusicPlayer.css";

export default function MusicPlayer({ shouldPlay }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (shouldPlay) {
      toggleMusic();
    }
  }, [shouldPlay]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Music error:", error);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/audio/background-music.mp3"
        loop
        preload="auto"
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      <button
        className="vinyl-button"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <div className={`vinyl-disc ${isPlaying ? "vinyl-spinning" : ""}`}>
          <div className="vinyl-center">
            <span>WK</span>
          </div>
        </div>
      </button>
    </>
  );
}
