import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log(user);
  return (
    (user && (
      <div>
        <img src={user.picture || ""} alt={user.name || ""} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )) || <div>Not logged in please log in to view your profile</div>
  );
}
