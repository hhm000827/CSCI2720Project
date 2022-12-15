// Hau Ho Man (1155142373) 	Li Pok Man (1155144098)
// Chan Ho Him (1155142195)	Chan King Yu (1155142699)
// Ng Hon Ling (1155136169)	Thalang Ikshahang (1155136408)
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
  return { location: req.body["location"], username: req.body["username"], comment: req.body["comment"] };
};

export { Comment, buildCommentObject };
