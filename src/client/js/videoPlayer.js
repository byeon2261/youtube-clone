import "../scss/styles.scss";

const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeLine");
const videoContainer = document.getElementById("videoContainer");
const fullScreenBtn = document.getElementById("fullScreen");
const videoControllers = document.getElementById("videoControllers");

let controllerTimeoutId = null;
let movingTimeoutId = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = volumeValue;
};

const timeFormat = (second) =>
  new Date(second * 1000).toISOString().substring(11, 19);

const handleMetadata = () => {
  totalTime.innerText = timeFormat(Math.floor(video.duration));
  timeLine.max = Math.floor(video.duration);
};
const handleTimeUpdate = () => {
  currentTime.innerText = timeFormat(Math.floor(video.currentTime));
  timeLine.value = Math.floor(video.currentTime);
};

const handleTimeLineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullScreenClick = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
  }
};

const controllerClassRemove = () =>
  videoControllers.classList.remove("showing");

const handleVideoMouseMove = () => {
  if (controllerTimeoutId) {
    clearTimeout(controllerTimeoutId);
    controllerTimeoutId = null;
  }
  if (movingTimeoutId) {
    clearTimeout(movingTimeoutId);
    movingTimeoutId = null;
  }

  videoControllers.classList.add("showing");
  movingTimeoutId = setTimeout(() => {
    controllerClassRemove();
  }, 3000);
};

const handleVIdeoMouseLeave = () => {
  controllerTimeoutId = setTimeout(() => {
    controllerClassRemove();
  }, 3000);
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.readyState
  ? handleMetadata()
  : video.addEventListener("loadedmetadata", handleMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeLine.addEventListener("input", handleTimeLineChange);
fullScreenBtn.addEventListener("click", handleFullScreenClick);
video.addEventListener("mousemove", handleVideoMouseMove);
video.addEventListener("mouseleave", handleVIdeoMouseLeave);
