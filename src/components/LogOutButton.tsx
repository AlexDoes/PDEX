import React from "react";

const LogOutButton = () => {
  return (
    <button className="w-20 h-12 border-2 border-green-500">
      <a href="/api/auth/logout">Logout</a>
    </button>
  );
};

export default LogOutButton;
