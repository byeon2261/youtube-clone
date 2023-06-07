import Video from "../models/Video";

export const home = async (req, res) => {
  Video.find({}, (error, videos) => {
    res.render("home", { pageTitle: "Home", videos });
  });
};
export const watch = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const video = await Video.findById(id);
  console.log(video);
  return res.render("watch", { pageTitle: `Watching: ${video.title}`, video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing: ` });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: `Upload Video` });
};
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error._message);
    return res.render("upload", {
      pageTitle: `Upload Video`,
      errorMessage: error._message,
    });
  }
};
