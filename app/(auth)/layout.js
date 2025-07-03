import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen py-[100px] flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
