import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";

export default function Profile(props) {
  const [state, setState] = useState({ user: {}, redirectToLogin: false });

  useEffect(() => {
    console.log("id", props.match.params.userId);
    // setState({...user, })
  }, []);

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Profile</h2>
      <p>Hello {isAuthenticated().user.name}</p>
      <p>Email: {isAuthenticated().user.email}</p>
    </div>
  );
}
