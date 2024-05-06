import React from "react";

const AppMenu = ({ children, setSideMenu, sideMenu }) => {
  return (
    <>
      <div
        className={`app-menu ${sideMenu ? "shown" : ""}`}
        style={{ zIndex: "2" }}
      >
        {children}
        <span
          className="app-menu-button d-inline-block d-xl-none pr-2 cursor-hand font-weight-bold"
          onClick={() => {
            setSideMenu(!sideMenu);
          }}
        >
          {sideMenu ? (
            <i className="iconsminds-arrow-right text-primary" />
          ) : (
            <i className="iconsminds-arrow-left text-primary" />
          )}
        </span>
      </div>
    </>
  );
};

export default AppMenu;
