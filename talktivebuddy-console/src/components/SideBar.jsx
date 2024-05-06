import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setSubMenuToggle } from "../Redux/Slices/SidebarToggle";

const SideBar = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const path = location.pathname;
  const homeActive = path.endsWith("dashboard");
  const groupsActive = path.endsWith("groups");
  const chatsActive = path.endsWith("chats");
  const profileActive = path.endsWith("profile");
  const friendsActive = path.endsWith("friends");
  const settingActive = path.endsWith("settings/blocked");

  // const [homeSubMenu, setHomeSubMenu] = useState(false);
  // const [ProductSubMenu, setProductSubMenu] = useState(false);
  // const [orderSubMenu, setOrderSubMenu] = useState(false);
  // const [fulfillSubMenu, setFulfillSubMenu] = useState(false);
  // const [customerSubMenu, setCustomerSubMenu] = useState(false);
  const [settingSubMenu, setSettingSubMenu] = useState(false);

  const hideAllsubmenu = () => {
    // setHomeSubMenu(false);
    // setProductSubMenu(false);
    // setOrderSubMenu(false);
    // setOrderSubMenu(false);
    // setFulfillSubMenu(false);
    // setCustomerSubMenu(false);
    setSettingSubMenu(false);
  };

  const handleToggleSubMenu = (flag) => {
    dispatch(setSubMenuToggle(flag));
  };

  return (
    <>
      <div
        // className={`menu ${toggleSidebar ? "showSidebar" : "hideSidebar"}`}
        className="menu"
        onMouseLeave={() => {
          handleToggleSubMenu(false);
          hideAllsubmenu();
        }}
      >
        <div className="main-menu default-transition">
          <div
            //  className="scroll ps ps--active-y"
            className="scrollbox scroll"
          >
            <ul className="list-unstyled">
              <li className={homeActive ? "active" : ""}>
                <Link to="/admin/dashboard">
                  <i className="iconsminds-home-4" />
                  <span>Home</span>
                </Link>
              </li>
              <li
                className={chatsActive ? "active" : ""}
                onMouseEnter={() => {
                  handleToggleSubMenu(false);

                  // setHomeSubMenu(false);
                  // setProductSubMenu(false);
                  // setOrderSubMenu(true);
                  // setOrderSubMenu(false);
                  // setFulfillSubMenu(false);
                  // setCustomerSubMenu(false);
                  setSettingSubMenu(false);
                }}
              >
                <Link to="/admin/chats">
                  <i className="iconsminds-speach-bubbles" /> Chats
                </Link>
              </li>
              <li
                className={groupsActive ? "active" : ""}
                onMouseEnter={() => {
                  handleToggleSubMenu(false);

                  // setHomeSubMenu(false);
                  // setProductSubMenu(true);
                  // setOrderSubMenu(false);
                  // setOrderSubMenu(false);
                  // setFulfillSubMenu(false);
                  // setCustomerSubMenu(false);
                  setSettingSubMenu(false);
                }}
              >
                <Link to="/admin/groups">
                  <i className="iconsminds-conference" /> Groups
                </Link>
              </li>

              <li
                className={friendsActive ? "active" : ""}
                onMouseEnter={() => {
                  handleToggleSubMenu(false);

                  // setHomeSubMenu(false);
                  // setProductSubMenu(false);
                  // setOrderSubMenu(false);
                  // setOrderSubMenu(false);
                  // setFulfillSubMenu(false);
                  // setCustomerSubMenu(true);
                  setSettingSubMenu(false);
                }}
              >
                <Link to="/admin/friends">
                  <i className="iconsminds-male-female" /> Friendship
                </Link>
              </li>
              <li
                className={profileActive ? "active" : ""}
                onMouseEnter={() => {
                  handleToggleSubMenu(false);

                  // setHomeSubMenu(false);
                  // setProductSubMenu(false);
                  // setOrderSubMenu(false);
                  // setOrderSubMenu(false);
                  // setFulfillSubMenu(true);
                  // setCustomerSubMenu(false);
                  setSettingSubMenu(false);
                }}
              >
                <Link to="/admin/profile">
                  <i className="iconsminds-male-2" /> Profile
                </Link>
              </li>
              <li
                className={settingActive ? "active" : ""}
                onMouseEnter={() => {
                  handleToggleSubMenu(true);
                  // setHomeSubMenu(false);
                  // setProductSubMenu(false);
                  // setOrderSubMenu(false);
                  // setOrderSubMenu(false);
                  // setFulfillSubMenu(false);
                  // setCustomerSubMenu(false);
                  setSettingSubMenu(true);
                }}
              >
                <Link to="#">
                  <i className="iconsminds-bell" /> Notifications
                </Link>
              </li>
            </ul>
            {/* <div className="ps__rail-x" style={{ left: "0px", bottom: "0px" }}>
              <div
                className="ps__thumb-x"
                tabIndex={0}
                style={{ left: "0px", width: "0px" }}
              />
            </div>
            <div
              className="ps__rail-y"
              style={{ top: "0px", height: "515px", right: "0px" }}
            >
              <div
                className="ps__thumb-y"
                tabIndex={0}
                style={{ top: "0px", height: "331px" }}
              />
            </div> */}
          </div>
        </div>

        <div className="sub-menu default-transition">
          <div
            // className="scroll ps"
            className="scrollbox scroll"
          >
            {settingSubMenu && (
              <>
                {Array(10)
                  .fill(1)
                  .map((d, i) => (
                    <div
                      className="d-flex flex-row mb-3 mx-3 pb-1 border-bottom"
                      key={i + 1}
                    >
                      <a href="#">
                        <img
                          src="../img/profiles/l-2.jpg"
                          alt=""
                          className="img-thumbnail list-thumbnail xsmall border-0 rounded-circle"
                        />
                      </a>
                      <div className="pl-2">
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
                  ))}
              </>
            )}
            {/* <ul
                className="list-unstyled d-block"
                data-link="layouts"
                id="layouts"
              >
                <li>
                  <a
                    href="#"
                    data-toggle="collapse"
                    data-target="#collapseAuthorization"
                    aria-expanded="true"
                    aria-controls="collapseAuthorization"
                    className="rotate-arrow-icon opacity-50"
                  >
                    <i className="simple-icon-arrow-down" />{" "}
                    <span className="d-inline-block">Authorization</span>
                  </a>
                  <div id="collapseAuthorization" className="collapse show">
                    <ul
                      className="list-unstyled inner-level-menu"
                      style={{ display: "none" }}
                    >
                      <li>
                        <a href="Pages.Auth.Login.html">
                          <i className="simple-icon-user-following" />{" "}
                          <span className="d-inline-block">Login</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Auth.Register.html">
                          <i className="simple-icon-user-follow" />{" "}
                          <span className="d-inline-block">Register</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Auth.ForgotPassword.html">
                          <i className="simple-icon-user-unfollow" />{" "}
                          <span className="d-inline-block">
                            Forgot Password
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a
                    href="#"
                    data-toggle="collapse"
                    data-target="#collapseProduct"
                    aria-expanded="true"
                    aria-controls="collapseProduct"
                    className="rotate-arrow-icon opacity-50"
                  >
                    <i className="simple-icon-arrow-down" />{" "}
                    <span className="d-inline-block">Product</span>
                  </a>
                  <div id="collapseProduct" className="collapse show">
                    <ul
                      className="list-unstyled inner-level-menu"
                      style={{ display: "none" }}
                    >
                      <li>
                        <a href="Pages.Product.List.html">
                          <i className="simple-icon-credit-card" />{" "}
                          <span className="d-inline-block">Data List</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Product.Thumbs.html">
                          <i className="simple-icon-list" />{" "}
                          <span className="d-inline-block">Thumb List</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Product.Images.html">
                          <i className="simple-icon-grid" />{" "}
                          <span className="d-inline-block">Image List</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Product.Detail.html">
                          <i className="simple-icon-book-open" />{" "}
                          <span className="d-inline-block">Detail</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a
                    href="#"
                    data-toggle="collapse"
                    data-target="#collapseProfile"
                    aria-expanded="true"
                    aria-controls="collapseProfile"
                    className="rotate-arrow-icon opacity-50"
                  >
                    <i className="simple-icon-arrow-down" />{" "}
                    <span className="d-inline-block">Profile</span>
                  </a>
                  <div id="collapseProfile" className="collapse show">
                    <ul
                      className="list-unstyled inner-level-menu"
                      style={{ display: "none" }}
                    >
                      <li>
                        <a href="Pages.Profile.Social.html">
                          <i className="simple-icon-share" />{" "}
                          <span className="d-inline-block">Social</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Profile.Portfolio.html">
                          <i className="simple-icon-link" />{" "}
                          <span className="d-inline-block">Portfolio</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a
                    href="#"
                    data-toggle="collapse"
                    data-target="#collapseBlog"
                    aria-expanded="true"
                    aria-controls="collapseBlog"
                    className="rotate-arrow-icon opacity-50"
                  >
                    <i className="simple-icon-arrow-down" />{" "}
                    <span className="d-inline-block">Blog</span>
                  </a>
                  <div id="collapseBlog" className="collapse show">
                    <ul
                      className="list-unstyled inner-level-menu"
                      style={{ display: "none" }}
                    >
                      <li>
                        <a href="Pages.Blog.html">
                          <i className="simple-icon-list" />{" "}
                          <span className="d-inline-block">List</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Blog.Detail.html">
                          <i className="simple-icon-book-open" />{" "}
                          <span className="d-inline-block">Detail</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Blog.Detail.Alt.html">
                          <i className="simple-icon-picture" />{" "}
                          <span className="d-inline-block">Detail Alt</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a
                    href="#"
                    data-toggle="collapse"
                    data-target="#collapseMisc"
                    aria-expanded="true"
                    aria-controls="collapseMisc"
                    className="rotate-arrow-icon opacity-50"
                  >
                    <i className="simple-icon-arrow-down" />{" "}
                    <span className="d-inline-block">Miscellaneous</span>
                  </a>
                  <div id="collapseMisc" className="collapse show">
                    <ul
                      className="list-unstyled inner-level-menu"
                      style={{ display: "none" }}
                    >
                      <li>
                        <a href="Pages.Misc.Coming.Soon.html">
                          <i className="simple-icon-hourglass" />{" "}
                          <span className="d-inline-block">Coming Soon</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Misc.Error.html">
                          <i className="simple-icon-exclamation" />{" "}
                          <span className="d-inline-block">Error</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Misc.Faq.html">
                          <i className="simple-icon-question" />{" "}
                          <span className="d-inline-block">Faq</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Misc.Invoice.html">
                          <i className="simple-icon-bag" />{" "}
                          <span className="d-inline-block">Invoice</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Misc.Knowledge.Base.html">
                          <i className="simple-icon-graduation" />{" "}
                          <span className="d-inline-block">Knowledge Base</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Misc.Mailing.html">
                          <i className="simple-icon-envelope-open" />{" "}
                          <span className="d-inline-block">Mailing</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Misc.Pricing.html">
                          <i className="simple-icon-diamond" />{" "}
                          <span className="d-inline-block">Pricing</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Misc.Search.html">
                          <i className="simple-icon-magnifier" />{" "}
                          <span className="d-inline-block">Search</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul> */}

            {/* <div className="ps__rail-x" style={{ left: "0px", bottom: "0px" }}>
              <div
                className="ps__thumb-x"
                tabIndex={0}
                style={{ left: "0px", width: "0px" }}
              />
            </div>
            <div className="ps__rail-y" style={{ top: "0px", right: "0px" }}>
              <div
                className="ps__thumb-y"
                tabIndex={0}
                style={{ top: "0px", height: "0px" }}
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
