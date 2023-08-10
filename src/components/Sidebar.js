import React, { useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import {
  TbDeviceAnalytics,
  TbMap2,
  TbIrregularPolyhedronPlus,
  TbIrregularPolyhedron,
  TbCategory2,
} from "react-icons/tb";
import { BsPhoneFlip } from "react-icons/bs";
import { TiBusinessCard } from "react-icons/ti";
import { MdOutlineManageAccounts } from "react-icons/md";
import Logo from "../assets/images/logo.png";
import "../assets/styles/styles.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const location = useLocation();

  const isNavLinkActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = (event) => {
    event.preventDefault();
    navigate("/");
  };
  return (
    <>
      <div className="dashboardMenu otherDevices">
        <ul className="dashboardMenuListSB">
          <li className="dashboardMenuListItemLogo">
            <div className="logoimage">
              <img src={Logo} alt="Logo" className="headerLogo" />
            </div>
          </li>
          <li>&nbsp;</li>
          <NavLink to="/dashboard" className="dashboardMenuListLink">
            <li
              className={
                isNavLinkActive("/dashboard")
                  ? "selectedLinkActive"
                  : "dashboardMenuListItem"
              }
            >
              <div className="sidebarMenuSide">
                <TbDeviceAnalytics color="white" className="sidebarMenuM" />
                <span className="padLeft">Dashboard</span>
              </div>
            </li>
          </NavLink>
          <NavLink to="/map" className="dashboardMenuListLink">
            <li
              className={
                isNavLinkActive("/map")
                  ? "selectedLinkActive"
                  : "dashboardMenuListItem"
              }
            >
              <div className="sidebarMenuSide">
                <TbMap2 color="white" className="sidebarMenuM" />
                <span className="padLeft">Map</span>
              </div>
            </li>
          </NavLink>
          <NavLink to="/incoming-claims" className="dashboardMenuListLink">
            <li
              className={
                isNavLinkActive("/incoming-claims")
                  ? "selectedLinkActive"
                  : "dashboardMenuListItem"
              }
            >
              <div className="sidebarMenuSide">
                <TbIrregularPolyhedronPlus
                  color="white"
                  className="sidebarMenuM"
                />
                <span className="padLeft">Incoming Claims</span>
              </div>
            </li>
          </NavLink>
          <NavLink to="/claims" className="dashboardMenuListLink">
            <li
              className={
                isNavLinkActive("/claims")
                  ? "selectedLinkActive"
                  : "dashboardMenuListItem"
              }
            >
              <div className="sidebarMenuSide">
                <TbIrregularPolyhedron color="white" className="sidebarMenuM" />
                <span className="padLeft">All Claims</span>
              </div>
            </li>
          </NavLink>
          <NavLink to="/clients" className="dashboardMenuListLink">
            <li
              className={
                isNavLinkActive("/clients")
                  ? "selectedLinkActive"
                  : "dashboardMenuListItem"
              }
            >
              <div className="sidebarMenuSide">
                <TiBusinessCard color="white" className="sidebarMenuM" />
                <span className="padLeft">Clients</span>
              </div>
            </li>
          </NavLink>
          <NavLink to="/categories" className="dashboardMenuListLink">
            <li
              className={
                isNavLinkActive("/categories")
                  ? "selectedLinkActive"
                  : "dashboardMenuListItem"
              }
            >
              <div className="sidebarMenuSide">
                <TbCategory2 color="white" className="sidebarMenuM" />
                <span className="padLeft">Categories</span>
              </div>
            </li>
          </NavLink>
          <NavLink to="/users" className="dashboardMenuListLink">
            <li
              className={
                isNavLinkActive("/users")
                  ? "selectedLinkActive"
                  : "dashboardMenuListItem"
              }
            >
              <div className="sidebarMenuSide">
                <BsPhoneFlip color="white" className="sidebarMenuM" />
                <span className="padLeft">Mobile Users</span>
              </div>
            </li>
          </NavLink>
          <NavLink to="/admins" className="dashboardMenuListLink">
            <li
              className={
                isNavLinkActive("/admins")
                  ? "selectedLinkActive"
                  : "dashboardMenuListItem"
              }
            >
              <div className="sidebarMenuSide">
                <MdOutlineManageAccounts
                  color="white"
                  className="sidebarMenuM"
                />
                <span className="padLeft">System Users</span>
              </div>
            </li>
          </NavLink>
        </ul>
        <div className="logoutButtonDiv">
          <button
            className="logoutButton"
            onClick={(event) => handleLogout(event)}
          >
            Logout
          </button>
        </div>
      </div>
      {/* <div className="dashboardMenu smallerdevices">
        <ul className="dashboardMenuListSB">
          <li className="dashboardMenuListItemLogo">
            <div className="logoimage">
              <img src={Logo} alt="Logo" className="headerLogo" />
            </div>
          </li>
          <li>&nbsp;</li>
          <NavLink to="/dashboard" className="dashboardMenuListLink">
            <li
              className={
                isNavLinkActive("/dashboard")
                  ? "selectedLinkActive"
                  : "dashboardMenuListItem"
              }
            >
              <div className="sidebarMenuSide">
                <TbDeviceAnalytics color="white" className="sidebarMenuM" />
                <span className="padLeft">Dashboard</span>
              </div>
            </li>
          </NavLink>
          <NavLink to="/map" className="dashboardMenuListLink">
            <li
              className={
                isNavLinkActive("/map")
                  ? "selectedLinkActive"
                  : "dashboardMenuListItem"
              }
            >
              <div className="sidebarMenuSide">
                <TbMap2 color="white" className="sidebarMenuM" />
                <span className="padLeft">Map</span>
              </div>
            </li>
          </NavLink>
          <NavLink to="/incoming-claims" className="dashboardMenuListLink">
            <li
              className={
                isNavLinkActive("/incoming-claims")
                  ? "selectedLinkActive"
                  : "dashboardMenuListItem"
              }
            >
              <div className="sidebarMenuSide">
                <TbIrregularPolyhedronPlus
                  color="white"
                  className="sidebarMenuM"
                />
                <span className="padLeft">Incoming Claims</span>
              </div>
            </li>
          </NavLink>
          <NavLink to="/claims" className="dashboardMenuListLink">
            <li
              className={
                isNavLinkActive("/claims")
                  ? "selectedLinkActive"
                  : "dashboardMenuListItem"
              }
            >
              <div className="sidebarMenuSide">
                <TbIrregularPolyhedron color="white" className="sidebarMenuM" />
                <span className="padLeft">All Claims</span>
              </div>
            </li>
          </NavLink>
          <NavLink to="/clients" className="dashboardMenuListLink">
            <li
              className={
                isNavLinkActive("/clients")
                  ? "selectedLinkActive"
                  : "dashboardMenuListItem"
              }
            >
              <div className="sidebarMenuSide">
                <TiBusinessCard color="white" className="sidebarMenuM" />
                <span className="padLeft">Clients</span>
              </div>
            </li>
          </NavLink>
          <NavLink to="/categories" className="dashboardMenuListLink">
            <li
              className={
                isNavLinkActive("/categories")
                  ? "selectedLinkActive"
                  : "dashboardMenuListItem"
              }
            >
              <div className="sidebarMenuSide">
                <TbCategory2 color="white" className="sidebarMenuM" />
                <span className="padLeft">Categories</span>
              </div>
            </li>
          </NavLink>
          <NavLink to="/users" className="dashboardMenuListLink">
            <li
              className={
                isNavLinkActive("/users")
                  ? "selectedLinkActive"
                  : "dashboardMenuListItem"
              }
            >
              <div className="sidebarMenuSide">
                <BsPhoneFlip color="white" className="sidebarMenuM" />
                <span className="padLeft">Mobile Users</span>
              </div>
            </li>
          </NavLink>
        </ul>
        <div className="logoutButtonDiv">
          <button
            className="logoutButton"
            onClick={(event) => handleLogout(event)}
          >
            Logout
          </button>
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;
