import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSidebarToggle } from "../Redux/Slices/SidebarToggle";
import { useMutation } from "react-query";
import axios from "../APIs/axios";
import { setUser } from "../Redux/Slices/User";
import { noUserImg } from "../utils/noUser";

const Header = () => {
  const validUser = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.toggleSidebar);
  const { mutate, isLoading } = useMutation(
    (payload) => axios.post("/auth/logout", payload),
    {
      onSuccess: (res) => {
        dispatch(setUser(null));
      },
      onError: (err) => {
        console.log(err.response.data.message || err);
      },
    }
  );

  const handleLogoutQuery = async () => {
    mutate({
      cookieName: "testToken",
    });
  };

  return (
    <>
      <nav className="navbar fixed-top" style={{ opacity: 1 }}>
        <div className="d-flex align-items-center navbar-left">
          <span
            onClick={() => {
              dispatch(setSidebarToggle(!sidebar.menu));
            }}
            className=" cursor-hand"
          >
            <span className="menu-button d-none d-md-block">
              <svg
                className="main"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 9 17"
              >
                <rect x="0.48" y="0.5" width={7} height={1} />
                <rect x="0.48" y="7.5" width={7} height={1} />
                <rect x="0.48" y="15.5" width={7} height={1} />
              </svg>
              <svg
                className="sub"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 17"
              >
                <rect x="1.56" y="0.5" width={16} height={1} />
                <rect x="1.56" y="7.5" width={16} height={1} />
                <rect x="1.56" y="15.5" width={16} height={1} />
              </svg>
            </span>
            <span className="menu-button-mobile d-xs-block d-sm-block d-md-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 17">
                <rect x="0.5" y="0.5" width={25} height={1} />
                <rect x="0.5" y="7.5" width={25} height={1} />
                <rect x="0.5" y="15.5" width={25} height={1} />
              </svg>
            </span>
          </span>
          <div className="search">
            <input placeholder="Search..." />
            <span className="search-icon">
              <i className="simple-icon-magnifier" />
            </span>
          </div>
          {/* <a
            className="btn btn-sm btn-outline-primary ml-3 d-none d-md-inline-block"
            href="https://1.envato.market/5kAb"
          >
            &nbsp;BUY&nbsp;
          </a> */}
        </div>
        <Link className="navbar-logo" to="/">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </Link>
        <div className="navbar-right">
          <div className="header-icons d-inline-block align-middle">
            {/* <div className="d-none d-md-inline-block align-text-bottom mr-3">
              <div
                className="custom-switch custom-switch-primary-inverse custom-switch-small pl-1"
                data-toggle="tooltip"
                data-placement="left"
                title=""
                data-original-title="Dark Mode"
              >
                <input
                  className="custom-switch-input"
                  id="switchDark"
                  type="checkbox"
                />
                <label className="custom-switch-btn" htmlFor="switchDark" />
              </div>
            </div> */}
            {/* <div className="position-relative d-none d-sm-inline-block">
              <button
                className="header-icon btn btn-empty"
                type="button"
                id="iconMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="simple-icon-grid" />
              </button>
              <div
                className="dropdown-menu dropdown-menu-right mt-3  position-absolute"
                id="iconMenuDropdown"
              >
                <a href="#" className="icon-menu-item">
                  <i className="iconsminds-equalizer d-block" />
                  <span>Settings</span>
                </a>
                <a href="#" className="icon-menu-item">
                  <i className="iconsminds-male-female d-block" />
                  <span>Users</span>
                </a>
                <a href="#" className="icon-menu-item">
                  <i className="iconsminds-puzzle d-block" />
                  <span>Components</span>
                </a>
                <a href="#" className="icon-menu-item">
                  <i className="iconsminds-bar-chart-4 d-block" />
                  <span>Profits</span>
                </a>
                <a href="#" className="icon-menu-item">
                  <i className="iconsminds-file d-block" />
                  <span>Surveys</span>
                </a>
                <a href="#" className="icon-menu-item">
                  <i className="iconsminds-suitcase d-block" />
                  <span>Tasks</span>
                </a>
              </div>
            </div> */}
            <div className="position-relative d-inline-block">
              <button
                className="header-icon btn btn-empty"
                type="button"
                id="notificationButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="simple-icon-bell" />
                <span className="count">1</span>
              </button>
              <div
                className="dropdown-menu dropdown-menu-right mt-3 position-absolute"
                id="notificationDropdown"
              >
                <div className="scroll scrollbox">
                  <div className="d-flex flex-row mb-3 pb-3 border-bottom">
                    <a href="#">
                      <img
                        src="../img/profiles/l-2.jpg"
                        alt=""
                        className="img-thumbnail list-thumbnail xsmall border-0 rounded-circle"
                      />
                    </a>
                    <div className="pl-3">
                      <a href="#">
                        <p className="font-weight-medium mb-1">
                          Joisse Kaycee just sent a new comment!
                        </p>
                        <p className="text-muted mb-0 text-small">
                          09.04.2018 - 12:45
                        </p>
                      </a>
                    </div>
                  </div>
                  {/* <div className="d-flex flex-row mb-3 pb-3 border-bottom">
                    <a href="#">
                      <img
                        src="../img/notifications/1.jpg"
                        alt=""
                        className="img-thumbnail list-thumbnail xsmall border-0 rounded-circle"
                      />
                    </a>
                    <div className="pl-3">
                      <a href="#">
                        <p className="font-weight-medium mb-1">
                          1 item is out of stock!
                        </p>
                        <p className="text-muted mb-0 text-small">
                          09.04.2018 - 12:45
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="d-flex flex-row mb-3 pb-3 border-bottom">
                    <a href="#">
                      <img
                        src="../img/notifications/2.jpg"
                        alt=""
                        className="img-thumbnail list-thumbnail xsmall border-0 rounded-circle"
                      />
                    </a>
                    <div className="pl-3">
                      <a href="#">
                        <p className="font-weight-medium mb-1">
                          New order received! It is total $147,20.
                        </p>
                        <p className="text-muted mb-0 text-small">
                          09.04.2018 - 12:45
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="d-flex flex-row mb-3 pb-3 ">
                    <a href="#">
                      <img
                        src="../img/notifications/3.jpg"
                        alt=""
                        className="img-thumbnail list-thumbnail xsmall border-0 rounded-circle"
                      />
                    </a>
                    <div className="pl-3">
                      <a href="#">
                        <p className="font-weight-medium mb-1">
                          3 items just added to wish list by a user!
                        </p>
                        <p className="text-muted mb-0 text-small">
                          09.04.2018 - 12:45
                        </p>
                      </a>
                    </div>
                  </div> */}
                  {/* <div
                    className="ps__rail-x"
                    style={{ left: "0px", bottom: "0px" }}
                  >
                    <div
                      className="ps__thumb-x"
                      tabIndex={0}
                      style={{ left: "0px", width: "0px" }}
                    />
                  </div>
                  <div
                    className="ps__rail-y"
                    style={{ top: "0px", right: "0px" }}
                  >
                    <div
                      className="ps__thumb-y"
                      tabIndex={0}
                      style={{ top: "0px", height: "0px" }}
                    />
                  </div> */}
                </div>
              </div>
            </div>
            {/* <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
            >
              <i className="simple-icon-size-fullscreen" />
              <i className="simple-icon-size-actual" />
            </button> */}
          </div>
          <div className="user d-inline-block">
            <button
              className="btn btn-empty p-0"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="name text-truncate">
                {validUser && `${validUser.firstName} ${validUser.lastName}`}
              </span>
              <span>
                <img
                  alt=""
                  src={
                    validUser && validUser?.image ? validUser.image : noUserImg
                  }
                />
              </span>
            </button>
            <div className="dropdown-menu dropdown-menu-right mt-3">
              <Link className="dropdown-item" to="/admin/profile">
                Account Settings
              </Link>
              {!isLoading && (
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => {
                    handleLogoutQuery();
                  }}
                >
                  Sign out
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
