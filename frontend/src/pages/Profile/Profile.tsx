import React from "react";
import { useAuth } from "../../contexts/auth";

function Profile() {
  const { user } = useAuth();
  return <h1>{user?.username}</h1>;
}

export default Profile;
