import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { getUser } from "./apiUser";
import { Link, useParams, useHistory } from "react-router-dom";
import user_avatar from "../images/user_avatar.png";
import DeleteUser from "./DeleteUser";
import FollowUserButton from "./FollowUserButton";
import ProfileTabs from "./ProfileTabs";

export default function Profile() {
  const [state, setState] = useState({
    user: { followers: [], following: [] },
    loading: false,
    following: false,
  });
  let history = useHistory();
  let params = useParams();
  const userId = params.userId;

  const checkFollow = function (user) {
    const jwt = isAuthenticated();
    const match = user.followers.find(
      (follower) => follower._id === jwt.user._id
    );
    return match;
  };

  useEffect(() => {
    const token = isAuthenticated().token;
    setState({ ...state, loading: true });
    getUser(userId, token)
      .then((res) => {
        const following = checkFollow(res.data);
        setState({ ...state, user: res.data, loading: false, following });
      })
      .catch((err) => history.push("/login"));
  }, [params.userId]);

  const clickFollowButton = function (callApi) {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    callApi(userId, token, state.user._id)
      .then((res) => {
        setState({
          ...state,
          user: res.data,
          following: !state.following,
        });
      })
      .catch((err) => setState({ ...state, error: err.response.data.error }));
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Profile</h2>
      {state.loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="row">
            <div className="col-md-6">
              <img
                style={{ height: "200px", width: "auto" }}
                className="img-thumbnail"
                src={`http://localhost:3001/user/photo/${userId}`}
                onError={(e) => (e.target.src = user_avatar)}
                alt={state.user.name}
              />
            </div>
            <div className="col-md-6">
              <div className="lead">
                <p>Hello {state.user.name}</p>
                <p>Email: {state.user.email}</p>
                <p>{`Joined ${new Date(state.user.created).toDateString()}`}</p>
              </div>

              {isAuthenticated().user &&
                isAuthenticated().user._id === state.user._id && (
                  <div className="d-inline-block">
                    <Link
                      className="btn btn-raised btn-success mr-5"
                      to={`/user/edit/${state.user._id}`}
                    >
                      Edit Profile
                    </Link>
                    <DeleteUser userId={state.user._id} />
                  </div>
                )}
              {isAuthenticated().user &&
                isAuthenticated().user._id !== state.user._id && (
                  <FollowUserButton
                    following={state.following}
                    onButtonClick={clickFollowButton}
                  />
                )}
            </div>
          </div>
          <div className="row">
            <div className="col md-12 mt-5 mb-5">
              <hr />
              <p className="lead">{state.user.about}</p>
              <hr />
              <ProfileTabs
                followers={state.user.followers}
                following={state.user.following}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
