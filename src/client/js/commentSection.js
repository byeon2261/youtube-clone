const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const btn = form.querySelector("button");

const handleSubmit = (event) => {
  event.preventDefault();
  const text = textarea.value;
  const textarea = form.querySelector("textarea");
  const videoId = videoContainer.dataset.id;
  fetch(`/videos/${videoId}/comment`, {
    method: "POST",
    body: { text },
  });
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
