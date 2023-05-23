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
    views: 1,
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
export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching: ${video.title}`, video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};
