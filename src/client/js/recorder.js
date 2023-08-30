const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

const handleStartClick = async () => {
  const record = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  console.log(record);
  preview.srcObject = record;
  preview.play();
};

startBtn.addEventListener("click", handleStartClick);
