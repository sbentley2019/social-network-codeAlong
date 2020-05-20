import React, { useState, useEffect } from "react";
import { getUser } from "./apiUser";
import { isAuthenticated } from "../auth";

export default function EditUser(props) {
  const [state, setState] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    loading: false,
  });

  useEffect(() => {
    const userId = props.match.params.userId;
    const token = isAuthenticated().token;
    setState({ ...state, loading: true });
    getUser(userId, token)
      .then((res) => {
        console.log("res:", res);
        setState({
          ...state,
          id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          loading: false,
        });
      })
      .catch((err) => setState({ ...state, redirectToLogin: true }));
  }, [props.match.params.userId]);

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Edit Profile </h2>
    </div>
  );
}
