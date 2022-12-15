// Hau Ho Man (1155142373) 	Li Pok Man (1155144098)
// Chan Ho Him (1155142195)	Chan King Yu (1155142699)
// Ng Hon Ling (1155136169)	Thalang Ikshahang (1155136408)
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
