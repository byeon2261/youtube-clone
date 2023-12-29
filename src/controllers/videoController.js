import User from "../models/User";
import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createAt: "desc" })
    .populate("owner");
  const { user } = req.session;
  console.log(user);
  return res.render("home", { pageTitle: "Home", videos });
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    // search keyword
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");
  if (video) {
    return res.render("watch", {
      pageTitle: `Watching: ${video.title}`,
      video,
    });
  }
  return res
    .status(404)
    .render("notFound", { pageTitle: "Video not found.", video });
};

export const checkVideoOwner = (req, res, video) => {
  const { _id } = req.session.user;
  if (String(video.owner) !== _id) {
    return res.status(403).redirect("/");
  }
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  checkVideoOwner(req, res, video);
  if (!video) {
    return res
      .status(404)
      .render("notFound", { pageTitle: "Video not found." });
  }
  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById(id);
  checkVideoOwner(req, res, video);
  if (!video) {
    return res
      .status(404)
      .render("notFound", { pageTitle: "Video not found." });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: `Upload Video` });
};
export const postUpload = async (req, res) => {
  const { _id } = req.session.user;
  const { path } = req.file;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      filePath: path,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo);
    user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error._message);
    return res.status(400).render("upload", {
      pageTitle: `Upload Video`,
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  checkVideoOwner(req, res, video);
  await Video.findByIdAndDelete(id);
  let user = await User.findOne({ videos: "id" });
  user.videos.splice(id, 1);
  await user.save();
  return res.redirect("/");
};

export const postComment = (req, res) => {
  console.log(req.params);
  console.log(req.body);
  return res.end();
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};
