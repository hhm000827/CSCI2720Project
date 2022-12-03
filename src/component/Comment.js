import React, { useEffect, useState } from "react";

const CommentDisplay = (props) => {
  const [comments, setComments] = useState();

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
        </div>
      </div>
    </>
  );
};

export { CommentDisplay };
