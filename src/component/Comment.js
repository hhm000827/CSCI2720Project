// Hau Ho Man (1155142373) 	Li Pok Man (1155144098)
// Chan Ho Him (1155142195)	Chan King Yu (1155142699)
// Ng Hon Ling (1155136169)	Thalang Ikshahang (1155136408)
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
      setTimeout(() => {
        fetchComment(props.venueName);
      }, 1000);
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
  }, []);

  return (
    <div className="card w-full glass">
      <div className="card-body">
        <h2 className="card-title">Comment</h2>
        {comments &&
          comments.map((comment) => {
            return (
              <div className="chat chat-end">
                <div className="chat-header">{comment.username}</div>
                <div className="chat-bubble chat-bubble-secondary">{comment.comment}</div>
              </div>
            );
          })}
        <div className="form-control">
          <textarea id="comment" className="textarea textarea-primary" placeholder="Type your comment." onKeyDown={pressEnter}></textarea>
        </div>
      </div>
    </div>
  );
};

export { CommentDisplay };
