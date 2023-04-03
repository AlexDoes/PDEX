import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user, error, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log(user);
  return (
    (isAuthenticated && user && (
      <div>
        <img
          src={
            user.picture ||
            "https://images.unsplash.com/photo-1679766826593-738e9b6338c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
            // "https://lh3.googleusercontent.com/a/AGNmyxaqxQ_OFo8s7oQsOvwfofGoIoZ0KJYuQ9vYd1Ya=s96-c"
          }
          alt={user.name || ""}
        />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )) || <div>Not logged in please log in to view your profile</div>
  );
}
