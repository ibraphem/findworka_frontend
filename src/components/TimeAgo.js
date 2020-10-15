import React from "react";
import useTimeAgo from "@rooks/use-time-ago";

const TimeAgo = ({ date }) => {
  let dateTimeParts = date.split(/[- :]/);
  dateTimeParts[1]--;

  const dateObject = new Date(...dateTimeParts);
  // console.log(new Date());
  const timeAgo = useTimeAgo(dateObject.getTime() - 1000 * 12, {
    locale: "en_NG",
  });
  return <div>{timeAgo}</div>;
};

export default TimeAgo;
