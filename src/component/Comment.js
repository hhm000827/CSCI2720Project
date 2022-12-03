import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const CommentDisplay = (props) => {
  const [comments, setComments] = useState();
  const user = sessionStorage.getItem("username");

  function submitComment() {
    const comment = document.getElementById("comment").value;
    if (comment) {
      fetch("/createComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          location: props.venueName,
          comment: comment.trim(),
        }),
      })
        .then((res) => (res.status === 200 ? res.json() : res.text()))
        .then((data) => {
          if (typeof data === "object") {
            document.getElementById("comment").value = "";
            fetchComment();
          } else {
            toast.error("Wrong comment format!");
          }
        });
    } else {
      toast.error("Empty Commment!");
    }
  }
  const pressEnter = (e) => {
    if (e.key === "Enter") {
      submitComment();
    }
  };

  const fetchComment = (venueName) => {
    let url = `/findCommentsByLocation?location=${venueName}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  };

  useEffect(() => {
    fetchComment(props.venueName);
  }, [comments]);

  return (
    <>
      <div className="card w-full glass">
        <div className="card-body">
          <h2 className="card-title">Comment</h2>
          {comments &&
            comments.map((comment) => {
              return (
                <div className="chat chat-end">
                  <div className="chat-header">{comment.username}</div>
                  <div className="chat-bubble chat-bubble-secondary">
                    {comment.comment}
                  </div>
                </div>
              );
            })}
          <div className="form-control">
            {" "}
            <textarea
              id="comment"
              className="textarea textarea-primary"
              placeholder="Type your comment."
              onKeyDown={pressEnter}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export { CommentDisplay };
