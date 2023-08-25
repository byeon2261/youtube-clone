import "../scss/styles.scss";

const video = document.querySelector("video");
const playBtn = document.getElementById("play");

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
    // playBtn.innerText = "Pause";
  } else {
    video.pause();
    // playBtn.innerText = "Play";
  }
};

const handlePlay = () => {
  playBtn.innerText = "Pause";
};
const handlePause = () => {
  playBtn.innerText = "Play";
};

playBtn.addEventListener("click", handlePlayClick);
video.addEventListener("play", handlePlay);
video.addEventListener("pause", handlePause);
