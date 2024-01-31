import { async } from "regenerator-runtime";
import "../scss/styles.scss";

const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeLine");
const videoContainer = document.getElementById("videoContainer");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
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
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (value) => {
  if (video.muted && value != 0) {
    video.muted = false;
    muteBtnIcon.classList = "fas fa-volume-up";
  }
  volumeValue = value;
  video.volume = volumeValue;
};
const handleVolumeRangeInput = (event) => {
  const {
    target: { value },
  } = event;
  handleVolumeChange(value);
};
const handleVolumeKeyDown = (args) => {
  let value = Number;
  if (volumeValue < 0.05 && args == "-0.05") {
    value = 0;
  } else if (volumeValue > 0.95 && args == "0.05") {
    value = 1;
  } else {
    value = Number((volumeValue + args).toFixed(2));
  }
  handleVolumeChange(value);
  volumeRange.value = value;
};

const timeFormat = (second) =>
  new Date(second * 1000).toISOString().substring(14, 19);

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

const handleChangeCurrentTime = (seconds) => {
  video.currentTime += seconds;
};

const handleFullScreenClick = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
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

const handleVideoMouseLeave = () => {
  controllerTimeoutId = setTimeout(() => {
    controllerClassRemove();
  }, 3000);
};

const handleVideoEnded = async () => {
  const { id } = videoContainer.dataset;
  await fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

document.addEventListener("keydown", (e) => {
  if (e.target.id === "commentArea") {
    return;
  }
  if (e.key == " ") {
    e.preventDefault();
    handlePlayClick();
  } else if (e.key == "m") {
    handleMuteClick();
  } else if (e.key == "ArrowLeft") {
    handleChangeCurrentTime(-5);
  } else if (e.key == "ArrowRight") {
    handleChangeCurrentTime(5);
  } else if (e.key == "ArrowUp") {
    e.preventDefault();
    handleVolumeKeyDown(0.05);
  } else if (e.key == "ArrowDown") {
    e.preventDefault();
    handleVolumeKeyDown(-0.05);
  }
});

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeRangeInput);
video.readyState
  ? handleMetadata()
  : video.addEventListener("loadedmetadata", handleMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("click", handlePlayClick);
video.addEventListener("ended", handleVideoEnded);
videoContainer.addEventListener("mousemove", handleVideoMouseMove);
videoContainer.addEventListener("mouseleave", handleVideoMouseLeave);
timeLine.addEventListener("input", handleTimeLineChange);
fullScreenBtn.addEventListener("click", handleFullScreenClick);
