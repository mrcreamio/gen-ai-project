import React, { useEffect } from "react";

const PublicLayout = ({ children }) => {
  // useEffect(() => {
  //   addClassToBody(["background", "no-footer"]);
  // }, []);

  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;
