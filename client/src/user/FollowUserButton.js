import React from "react";
import { follow, unfollow } from "./apiUser";

export default function FollowUserButton(props) {
  const followClick = function () {
    props.onButtonClick(follow);
  };

  const UnFollowClick = function () {
    props.onButtonClick(unfollow);
  };

  return (
    <div className="d-inline-block">
      {!props.following ? (
        <button className="btn btn-success btn-raised" onClick={followClick}>
          Follow
        </button>
      ) : (
        <button
          className="btn btn-danger btn-raised mr-5"
          onClick={UnFollowClick}
        >
          UnFollow
        </button>
      )}
    </div>
  );
}
