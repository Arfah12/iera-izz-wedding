let backgroundAudio = null;

export function getBackgroundAudio() {
  if (!backgroundAudio) {
    backgroundAudio = new Audio("/assets/audio/background-music.mp3");
    backgroundAudio.loop = true;
    backgroundAudio.preload = "auto";
  }

  return backgroundAudio;
}

export function startBackgroundMusic() {
  const audio = getBackgroundAudio();

  if (!audio.paused) return Promise.resolve();

  return audio.play();
}
