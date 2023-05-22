let videos = [
  {
    title: "best video",
    rating: 3,
    comment: 2,
    createdAt: "2 minute ago.",
    views: 47,
    id: 1,
  },
  {
    title: "video #2",
    rating: 3,
    comment: 2,
    createdAt: "2 Hour ago.",
    views: 454,
    id: 2,
  },
  {
    title: "i like it.",
    rating: 3,
    comment: 2,
    createdAt: "2 day ago.",
    views: 54334,
    id: 3,
  },
];
export const tranding = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};
export const see = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching ${video.title}` });
};
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const search = (req, res) => res.send("Search Video");
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
