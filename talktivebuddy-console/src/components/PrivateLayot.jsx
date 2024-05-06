import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setSidebarToggle } from "../Redux/Slices/SidebarToggle";
import { setResolution } from "../Redux/Slices/Resolution";
import Header from "./Admin/Header";

const PrivateLayout = ({ children }) => {
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.toggleSidebar);
  const resolution = useSelector((state) => state.resolution);

  useEffect(() => {
    dispatch(setResolution({ x: window.innerWidth, y: window.innerHeight }));
    function handleResize() {
      dispatch(setResolution({ x: window.innerWidth, y: window.innerHeight }));
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(setSidebarToggle(resolution?.x <= 767));
  }, [resolution?.x <= 767]);

  useEffect(() => {
    removeClassToBody(["background", "no-footer"]);
  }, []);

  return (
    <div className="h-100">
      {/* <div className="notification-container notification-container-empty">
        <div />
      </div> */}
      {/* <div className="theme-colors ">
        <div className="p-4">
          <p className="text-muted mb-2">Light Theme</p>
          <div className="d-flex flex-row justify-content-between mb-3">
            <a
              href="#light.bluenavy"
              className="theme-color theme-color-bluenavy "
            >
              <span> </span>
            </a>
            <a
              href="#light.blueyale"
              className="theme-color theme-color-blueyale "
            >
              <span> </span>
            </a>
            <a
              href="#light.blueolympic"
              className="theme-color theme-color-blueolympic active"
            >
              <span> </span>
            </a>
            <a
              href="#light.greenmoss"
              className="theme-color theme-color-greenmoss "
            >
              <span> </span>
            </a>
            <a
              href="#light.greenlime"
              className="theme-color theme-color-greenlime "
            >
              <span> </span>
            </a>
          </div>
          <div className="d-flex flex-row justify-content-between mb-4">
            <a
              href="#light.purplemonster"
              className="theme-color theme-color-purplemonster "
            >
              <span> </span>
            </a>
            <a
              href="#light.orangecarrot"
              className="theme-color theme-color-orangecarrot "
            >
              <span> </span>
            </a>
            <a
              href="#light.redruby"
              className="theme-color theme-color-redruby "
            >
              <span> </span>
            </a>
            <a
              href="#light.yellowgranola"
              className="theme-color theme-color-yellowgranola "
            >
              <span> </span>
            </a>
            <a
              href="#light.greysteel"
              className="theme-color theme-color-greysteel "
            >
              <span> </span>
            </a>
          </div>
          <p className="text-muted mb-2">Dark Theme</p>
          <div className="d-flex flex-row justify-content-between mb-3">
            <a
              href="#dark.bluenavy"
              className="theme-color theme-color-bluenavy "
            >
              <span> </span>
            </a>
            <a
              href="#dark.blueyale"
              className="theme-color theme-color-blueyale "
            >
              <span> </span>
            </a>
            <a
              href="#dark.blueolympic"
              className="theme-color theme-color-blueolympic "
            >
              <span> </span>
            </a>
            <a
              href="#dark.greenmoss"
              className="theme-color theme-color-greenmoss "
            >
              <span> </span>
            </a>
            <a
              href="#dark.greenlime"
              className="theme-color theme-color-greenlime "
            >
              <span> </span>
            </a>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <a
              href="#dark.purplemonster"
              className="theme-color theme-color-purplemonster "
            >
              <span> </span>
            </a>
            <a
              href="#dark.orangecarrot"
              className="theme-color theme-color-orangecarrot "
            >
              <span> </span>
            </a>
            <a
              href="#dark.redruby"
              className="theme-color theme-color-redruby "
            >
              <span> </span>
            </a>
            <a
              href="#dark.yellowgranola"
              className="theme-color theme-color-yellowgranola "
            >
              <span> </span>
            </a>
            <a
              href="#dark.greysteel"
              className="theme-color theme-color-greysteel "
            >
              <span> </span>
            </a>
          </div>
        </div>
        <div className=" pb-0 pl-4 pt-4">
          <div className="form-group">
            <label htmlFor="radiusRadio" className>
              Border Radius{" "}
            </label>
            <div>
              <div className="custom-radio custom-control custom-control-inline">
                <input
                  type="radio"
                  name="radiusRadio"
                  id="rounded"
                  className="custom-control-input"
                  defaultChecked
                />
                <label className="custom-control-label" htmlFor="rounded">
                  Rounded
                </label>
              </div>
              <div className="custom-radio custom-control custom-control-inline">
                <input
                  type="radio"
                  name="radiusRadio"
                  id="flat"
                  className="custom-control-input"
                />
                <label className="custom-control-label" htmlFor="flat">
                  Flat
                </label>
              </div>
            </div>
          </div>
        </div>
        <a href="#section" className="theme-button">
          {" "}
          <i className="simple-icon-magic-wand" />{" "}
        </a>
      </div> */}
      <div
      // id="app-container"
      // className={`menu-default menu-sub-hidden rounded ${
      //   sidebar.menu ? "main-hidden sub-hidden" : ""
      // } ${sidebar.subMenu ? "sub-show-temporary" : ""}`}
      >
        <Header />
        {/* <SideBar /> */}
        <main className="default-transition p-3" style={{ opacity: 1 }}>
          {children}
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default PrivateLayout;
