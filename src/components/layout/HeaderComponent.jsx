import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle, Form } from "reactstrap";
import Select from "react-select";
//import images
import logoSm from "../../assets/images_/regionalconcept_logo_rgb.png";
import logoDark from "../../assets/images_/regionalconcept_logo_rgb.png";
import logoLight from "../../assets/images_/regionalconcept_logo_rgb.png";
import sendRequestIcon from "../../assets/images/navbar/sendpayment.png";
import RequestIcon from "../../assets/images/navbar/requestpayment.png";
import ConverterIcon from "../../assets/images/navbar/converter.png";
import NotificationIcon from "../../assets/images/navbar/notification.png";
//import Components
import SearchOption from "../common/SearchOption";
import LanguageDropdown from "../common/LanguageDropdown";
import WebAppsDropdown from "../common/WebAppsDropdown";
import MyCartDropdown from "../common/MyCartDropdown";
import FullScreenDropdown from "../common/FullScreenDropdown";
import NotificationDropdown from "../common/NotificationDropdown";
import ProfileDropdown from "../common/ProfileDropdown";
import LightDark from "../common/LightDark";

import { changeSidebarVisibility } from "../../store/thunk";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const Header = ({ onChangeLayoutMode, layoutModeType, headerClass }) => {
  const dispatch = useDispatch();

  const selectDashboardData = createSelector(
    (state) => state.Layout,
    (state) => ({
      sidebarVisibilitytype: state.sidebarVisibilitytype,
    })
  );
  // Inside your component
  const { sidebarVisibilitytype } = useSelector(selectDashboardData);

  const [search, setSearch] = useState(false);
  const toogleSearch = () => {
    setSearch(!search);
  };

  const toogleMenuBtn = () => {
    var windowSize = document.documentElement.clientWidth;
    dispatch(changeSidebarVisibility("show"));

    if (windowSize > 767)
      document.querySelector(".hamburger-icon").classList.toggle("open");

    //For collapse horizontal menu
    if (document.documentElement.getAttribute("data-layout") === "horizontal") {
      document.body.classList.contains("menu")
        ? document.body.classList.remove("menu")
        : document.body.classList.add("menu");
    }

    //For collapse vertical and semibox menu
    if (
      sidebarVisibilitytype === "show" &&
      (document.documentElement.getAttribute("data-layout") === "vertical" ||
        document.documentElement.getAttribute("data-layout") === "semibox")
    ) {
      if (windowSize < 1025 && windowSize > 767) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.documentElement.getAttribute("data-sidebar-size") === "sm"
          ? document.documentElement.setAttribute("data-sidebar-size", "")
          : document.documentElement.setAttribute("data-sidebar-size", "sm");
      } else if (windowSize > 1025) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.documentElement.getAttribute("data-sidebar-size") === "lg"
          ? document.documentElement.setAttribute("data-sidebar-size", "sm")
          : document.documentElement.setAttribute("data-sidebar-size", "lg");
      } else if (windowSize <= 767) {
        document.body.classList.add("vertical-sidebar-enable");
        document.documentElement.setAttribute("data-sidebar-size", "lg");
      }
    }

    //Two column menu
    if (document.documentElement.getAttribute("data-layout") === "twocolumn") {
      document.body.classList.contains("twocolumn-panel")
        ? document.body.classList.remove("twocolumn-panel")
        : document.body.classList.add("twocolumn-panel");
    }
  };

  const sortbyname = [
    {
      options: [
        { label: "Alabama", value: "AL" },
        { label: "Madrid", value: "MA" },
        { label: "Toronto", value: "TO" },
        { label: "Londan", value: "LO" },
        { label: "Wyoming", value: "WY" },
      ],
    },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "250px",
    }),
    menu: (provided, state) => ({
      ...provided,
      width: "250px",
    }),
  };

  return (
    <React.Fragment>
      <header id="page-topbar" className={headerClass}>
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex flex-1 align-items-center">
              <div className="navbar-brand-box horizontal-logo">
                <Link to="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logoSm} alt="" height="30" />
                  </span>
                  <span className="logo-lg">
                    <img src={logoDark} alt="" height="30" />
                  </span>
                </Link>

                <Link to="/" className="logo logo-light">
                  <span className="logo-sm">
                    <img src={logoSm} alt="" height="30" />
                  </span>
                  <span className="logo-lg">
                    <img src={logoLight} alt="" height="17" />
                  </span>
                </Link>
              </div>

              <button
                onClick={toogleMenuBtn}
                type="button"
                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                id="topnav-hamburger-icon"
              >
                <span className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
              <SearchOption />
              <div className="mx-auto d-lg-block d-none">
                <div className="mx-lg-3">
                  <Select
                    options={sortbyname}
                    placeholder="Select Owner Account"
                    id="choices-single-default"
                    className="js-example-basic-single mb-0"
                    name="owner"
                    styles={customStyles}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <Dropdown
                isOpen={search}
                toggle={toogleSearch}
                className="d-xl-none topbar-head-dropdown header-item"
              >
                <DropdownToggle
                  type="button"
                  tag="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                >
                  <i className="bx bx-search fs-22"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
                  <Form className="p-3">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search ..."
                          aria-label="Recipient's username"
                        />
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify"></i>
                        </button>
                      </div>
                    </div>
                  </Form>
                </DropdownMenu>
              </Dropdown>

              {/* LanguageDropdown */}
              <LanguageDropdown />

              <ul className="list-unstyled mb-0 ms-2 d-flex align-items-center">
                <li className="me-3">
                  <Link to={"/profile?tab=payment&type=send"}>
                    <img
                      src={sendRequestIcon}
                      alt="Send Payment"
                      width="22px"
                    />
                  </Link>
                </li>
                <li className="me-3">
                  <Link to={"/profile?tab=payment&type=request"}>
                    <img src={RequestIcon} alt="Request Payment" width="22px" />
                  </Link>
                </li>
                <li className="me-3">
                  <img src={ConverterIcon} alt="converter" width="22px" />
                </li>
                <li>
                  <img src={NotificationIcon} alt="notification" width="22px" />
                </li>
              </ul>

              {/* WebAppsDropdown */}
              {/* <WebAppsDropdown /> */}

              {/* MyCartDropdwon */}
              {/* <MyCartDropdown /> */}

              {/* FullScreenDropdown */}
              <FullScreenDropdown />

              {/* Dark/Light Mode set */}
              <LightDark
                layoutMode={layoutModeType}
                onChangeLayoutMode={onChangeLayoutMode}
              />

              {/* NotificationDropdown */}
              {/* <NotificationDropdown /> */}

              {/* ProfileDropdown */}
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
