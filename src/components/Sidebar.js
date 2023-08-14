import React from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import { logoutUser } from "../state/userSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { role } = user[0];
  const location = useLocation();

  const isNavLinkActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("4E2hT6rG8nL1wY5zI3O9K7sD0X6yF7lP");
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="dashboardMenu otherDevices">
      <ul className="dashboardMenuListSB">
        {/* Common elements for both superadmin and basicadmin */}
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

        {/* Elements specific to superadmin */}
        {role === "superadmin" && (
          <>
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
                  <TbIrregularPolyhedron
                    color="white"
                    className="sidebarMenuM"
                  />
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
          </>
        )}

        {/* Elements specific to basicadmin */}
        {role === "basicadmin" && (
          <>
            <NavLink to="/claims" className="dashboardMenuListLink">
              <li
                className={
                  isNavLinkActive("/claims")
                    ? "selectedLinkActive"
                    : "dashboardMenuListItem"
                }
              >
                <div className="sidebarMenuSide">
                  <TbIrregularPolyhedron
                    color="white"
                    className="sidebarMenuM"
                  />
                  <span className="padLeft">All Claims</span>
                </div>
              </li>
            </NavLink>
            <NavLink to="/subclients" className="dashboardMenuListLink">
              <li
                className={
                  isNavLinkActive("/subclients")
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
            <NavLink to="/subcategories" className="dashboardMenuListLink">
              <li
                className={
                  isNavLinkActive("/subcategories")
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
          </>
        )}
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
      {/* Logout Button */}
      <div className="logoutButtonDiv">
        <button
          className="logoutButton"
          onClick={(event) => handleLogout(event)}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
