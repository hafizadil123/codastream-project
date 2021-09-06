import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Trans } from "react-i18next";
import ModalContext from "../shared/context";
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }
 
  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/apps", state: "appsMenuOpen" },
      { path: "/basic-ui", state: "basicUiMenuOpen" },
      { path: "/form-elements", state: "formElementsMenuOpen" },
      { path: "/tables", state: "tablesMenuOpen" },
      { path: "/icons", state: "iconsMenuOpen" },
      { path: "/charts", state: "chartsMenuOpen" },
      { path: "/user-pages", state: "userPagesMenuOpen" },
      { path: "/error-pages", state: "errorPagesMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  render() {
    console.log("asdfghjk", this.state.show);
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="index.html">
            <span style={{ color: "white" }}>Codastreams</span>
          </a>
          <a className="sidebar-brand brand-logo-mini" href="index.html">
            <img
              src={require("../../assets/images/logo-mini.svg")}
              alt="logo"
            />
          </a>
        </div>

        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  <img
                    className="img-xs rounded-circle "
                    src={require("../../assets/images/faces/face15.jpg")}
                    alt="profile"
                  />
                  <span className="count bg-success"></span>
                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal">
                    <Trans>Adil Sikandar</Trans>
                  </h5>
                  <span>
                    <Trans>Gold Member</Trans>
                  </span>
                </div>
              </div>
            </div>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link">
              <Trans></Trans>
            </span>
          </li>
          <li
            className={
              this.isPathActive("/dashboard")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon">
                <i className="mdi mdi-speedometer"></i>
              </span>
              <span className="menu-title">
                <Trans>Home</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/")
                ? "nav-item menu-items"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/dashboard/your-library">
              <span className="menu-icon">
                <i className="mdi mdi-speedometer"></i>
              </span>
              <span className="menu-title">
                <Trans>Your Library</Trans>
              </span>
            </Link>
          </li>

          <ModalContext.Consumer>
            {({ handleToggleShow, show }) => (
              <li
                className={
                  this.isPathActive("/dashboard1")
                    ? "nav-item menu-items"
                    : "nav-item menu-items"
                }
                onClick={() => handleToggleShow(true, "create-playlist")}
              >
                <Link className="nav-link" to="/dashboard">
                  <span className="menu-icon">
                    <i className="mdi mdi-speedometer"></i>
                  </span>
                  <span className="menu-title">
                    <Trans>Create Playlist</Trans>
                  </span>
                </Link>
              </li>
            )}
          </ModalContext.Consumer>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <ModalContext.Consumer>
            {({ handleToggleShow, show }) => (
              <li
                className={
                  this.isPathActive("/")
                    ? "nav-item menu-items"
                    : "nav-item menu-items"
                }
                onClick={() => handleToggleShow(true, "cookie")}
              >
                <Link className="nav-link" to="/">
                  <span className="menu-title" style={{ marginLeft: "10px" }}>
                    <Trans>Cookies</Trans>
                  </span>
                </Link>
              </li>
            )}
          </ModalContext.Consumer>

          <ModalContext.Consumer>
            {({ handleToggleShow, show }) => (
              <li
                className={
                  this.isPathActive("/")
                    ? "nav-item menu-items"
                    : "nav-item menu-items"
                }
                onClick={() => handleToggleShow(true, "privacy")}
              >
                <Link className="nav-link" to="/">
                  <span className="menu-title" style={{ marginLeft: "10px" }}>
                    <Trans>Privacy</Trans>
                  </span>
                </Link>
              </li>
            )}
          </ModalContext.Consumer>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
}

export default withRouter(Sidebar);
