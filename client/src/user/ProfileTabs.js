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
                <Link to={`/user/${person._id}`}>
                  <img
                    className="float-left mr-2"
                    height="50px"
                    src={`http://localhost:3001/user/photo/${person._id}`}
                    onError={(e) => (e.target.src = user_avatar)}
                    alt={person.name}
                  />
                  <div>
                    <h3>{person.name}</h3>
                  </div>
                </Link>
                <p style={{ clear: "both", textAlign: "center" }}>
                  {person.about}
                </p>
              </div>
            );
          })}
        </div>

        <div className="col-md-4">
          <h3 className="text-primary">Following</h3>
          <hr />
          {props.following.map((person, i) => {
            return (
              <div key={i} className="row">
                <Link to={`/user/${person._id}`}>
                  <img
                    className="float-left mr-2"
                    height="50px"
                    src={`http://localhost:3001/user/photo/${person._id}`}
                    onError={(e) => (e.target.src = user_avatar)}
                    alt={person.name}
                  />
                  <div>
                    <h3>{person.name}</h3>
                  </div>
                </Link>
                <p style={{ clear: "both", textAlign: "center" }}>
                  {person.about}
                </p>
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
  // return (
  //   <>
  //     <div>
  //       <h3 className="text-primary">Followers</h3>
  //       <hr />
  //       <ul
  //         style={{
  //           display: "flex",
  //           flexWrap: "wrap",
  //           listStyle: "none",
  //           paddingLeft: "0",
  //         }}
  //       >
  //         {props.followers.map((person, i) => {
  //           return (
  //             <li key={i} className="m-5">
  //               <Link to={`/user/${person._id}`}>
  //                 <figure
  //                   style={{
  //                     height: "200px",
  //                     width: "200px",
  //                   }}
  //                 >
  //                   <img
  //                     src={`http://localhost:3001/user/photo/${person._id}`}
  //                     alt={person.name}
  //                     className="img-thumbnail"
  //                     onError={(e) => (e.target.src = user_avatar)}
  //                   />
  //                   <figcaption>{person.name}</figcaption>
  //                 </figure>
  //               </Link>
  //             </li>
  //           );
  //         })}
  //       </ul>
  //     </div>
  //     <div>
  //       <h3 className="text-primary">Following</h3>
  //       <hr />
  //       <ul
  //         style={{
  //           display: "flex",
  //           flexWrap: "wrap",
  //           listStyle: "none",
  //           paddingLeft: "0",
  //         }}
  //       >
  //         {props.following.map((person, i) => {
  //           return (
  //             <li key={i} className="m-5">
  //               <Link to={`/user/${person._id}`}>
  //                 <figure style={{ height: "200px", width: "200px" }}>
  //                   <img
  //                     src={`http://localhost:3001/user/photo/${person._id}`}
  //                     alt={person.name}
  //                     className="img-thumbnail"
  //                     onError={(e) => (e.target.src = user_avatar)}
  //                   />
  //                   <figcaption>{person.name}</figcaption>
  //                 </figure>
  //               </Link>
  //             </li>
  //           );
  //         })}
  //       </ul>
  //     </div>
  //   </>
  // );
}
