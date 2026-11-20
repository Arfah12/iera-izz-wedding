
import { useEffect, useRef, useState } from "react";
import { getBackgroundAudio } from "../services/backgroundMusic";
import "./MusicPlayer.css";

export default function MusicPlayer() {
  const audioRef = useRef(getBackgroundAudio());
  const [isPlaying, setIsPlaying] = useState(
    () => !getBackgroundAudio().paused
  );

  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

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
