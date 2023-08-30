const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

let stream;

const handleStopClick = () => {
  startBtn.innerText = "Start Recording!";
  startBtn.removeEventListener("click", handleStopClick);
  startBtn.addEventListener("click", handleStartClick);
};

const handleStartClick = () => {
  startBtn.innerText = "Stop Recording!";
  startBtn.removeEventListener("click", handleStartClick);
  startBtn.addEventListener("click", handleStopClick);

  const recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    console.log(e);
  };
  console.log(recorder);
  recorder.start();
  console.log(recorder);
  setTimeout(() => {
    recorder.stop();
  }, 3000);
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  preview.srcObject = stream;
  preview.play();
};

init();
startBtn.addEventListener("click", handleStartClick);
