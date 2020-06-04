import React from "react";
import { Link } from "react-router-dom";
import user_avatar from "../images/user_avatar.png";

export default function ProfileTabs(props) {
  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <h3 className="text-primary">Followers</h3>
          <hr />
          {props.followers.map((person, i) => {
            return (
              <div key={i} className="row">
                <Link to={`/user/${person._id}`} style={{ display: "flex" }}>
                  <img
                    className="float-left mr-2"
                    height="50px"
                    width="50px"
                    src={`http://localhost:3001/user/photo/${person._id}`}
                    onError={(e) => (e.target.src = user_avatar)}
                    alt={person.name}
                    style={{ borderRadius: "50%", border: "1px solid black" }}
                  />
                  <div>
                    <p className="lead">{person.name}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="col-md-4">
          <h3 className="text-primary">Following</h3>
          <hr />
          {props.following.map((person, i) => {
            return (
              <div key={i}>
                <Link to={`/user/${person._id}`} style={{ display: "flex" }}>
                  <img
                    className="mr-2"
                    height="50px"
                    width="50px"
                    src={`http://localhost:3001/user/photo/${person._id}`}
                    onError={(e) => (e.target.src = user_avatar)}
                    alt={person.name}
                    style={{ borderRadius: "50%", border: "1px solid black" }}
                  />
                  <div>
                    <p className="lead">{person.name}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="col-md-4">
          <h3 className="text-primary">Posts</h3>
        </div>
      </div>
    </div>
  );
}
