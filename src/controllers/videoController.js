export const tranding = (req, res) => res.render("home");
export const see = (req, res) => res.render("watch");
export const edit = (req, res) =>
  res.send(
    `<!DOCTYPE html><html lang='ko'><head><title>Youtube</title></head><body><h1>Edit Video #${req.params.id}</h1><footer>&copy; 2023 youtube - All reights reserved</footer></body></html>`
  );
export const search = (req, res) => res.send("Search Video");
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
