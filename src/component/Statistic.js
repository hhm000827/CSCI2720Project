import React, { useEffect, useState } from "react";
import { currentDateTime } from "./Date";
const LocationStatistic = (props) => {
  const [comments, setComments] = useState();
  const dateTime = currentDateTime();

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
    <div class="stats bg-primary text-primary-content h-40">
      <div class="stat">
        <div class="stat-title">Number of Event</div>
        <div class="stat-value">{props.sessionStorageData ? props.sessionStorageData.length : 0}</div>
        <div className="stat-desc">{dateTime}</div>
      </div>
      <div class="stat">
        <div class="stat-title">Number of Comment</div>
        <div class="stat-value">{comments ? comments.length : 0}</div>
        <div className="stat-desc">{dateTime}</div>
      </div>
    </div>
  );
};

export { LocationStatistic };
