import React from "react";

export const Loader = () => {
  return (
    <div className="position-relative">
      <span className="loading position-absolute"></span>
    </div>
  );
};

export const PageLoader = () => {
  return (
    <main className="">
      <span className="loading position-absolute"></span>
    </main>
  );
};
