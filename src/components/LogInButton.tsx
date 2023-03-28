import React from "react";

const LogInButton = () => {
  return (
    <div>
      <button className="w-20 h-12 border-2 border-green-500">
        <a href="/api/auth/login">Login</a>
      </button>
    </div>
  );
};

export default LogInButton;
