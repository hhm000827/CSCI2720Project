import { createRequire } from "module";

const require = createRequire(import.meta.url);
const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  location: { type: String, required: true },
  username: { type: String, required: true },
  comment: { type: String, required: true },
});
const Comment = mongoose.model("Comment", CommentSchema);

const buildCommentObject = (req) => {
  return { location: req.query["location"], username: req.query["username"], comment: req.query["comment"] };
};

export { Comment, buildCommentObject };
