const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownloadClick = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm";
  document.body.appendChild(a);
  a.click();
};

const handleStopClick = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStopClick);
  startBtn.addEventListener("click", handleDownloadClick);

  recorder.stop();
};

const handleStartClick = () => {
  startBtn.innerText = "Stop Recording!";
  startBtn.removeEventListener("click", handleStartClick);
  startBtn.addEventListener("click", handleStopClick);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    preview.srcObject = null;
    preview.src = videoFile;
    preview.loop = true;
    preview.play();
  };
  recorder.start();
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
