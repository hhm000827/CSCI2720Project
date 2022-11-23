import { createRequire } from "module";

const require = createRequire(import.meta.url);
const mongoose = require("mongoose");
const dbUrl = "mongodb+srv://stu045:p011313W@cluster0.wenbhsm.mongodb.net/stu045";

const CommentSchema = mongoose.Schema({
  location: { type: String, required: true },
  username: { type: String, required: true },
  comment: { type: String, required: true },
});
const Comment = mongoose.model("Comment", CommentSchema);

const createComment = (commentObject) => {
  mongoose.connect(dbUrl, function (err, db) {
    if (err) throw err;

    Comment.create(
      {
        location: commentObject.location,
        username: commentObject.username,
        comment: commentObject.comment,
      },
      (err, comment) => {
        if (err) console.log(err);
        return console.log(comment);
      }
    );
  });
};

const findCommentsByLocation = (location) => {
  mongoose.connect(dbUrl, function (err, db) {
    if (err) throw err;

    Comment.find({ location: location }, (err, results) => {
      if (err) throw err;
      return console.log(results);
    });
  });
};

const deleteComment = (commentObject) => {
  mongoose.connect(dbUrl, function (err, db) {
    if (err) throw err;

    Comment.remove(commentObject, (err, results) => {
      if (err) throw err;
      return console.log(results);
    });
  });
};

export { createComment, findCommentsByLocation, deleteComment };
