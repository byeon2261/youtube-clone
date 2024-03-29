import mongoose from "mongoose";
import User from "./User";

const videoSchema = new mongoose.Schema({
  filePath: { type: String, required: true },
  title: { type: String, required: true, maxlength: 80 },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: User },
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
  ],
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
