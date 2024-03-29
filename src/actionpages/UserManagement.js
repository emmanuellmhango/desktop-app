import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar";
import { fetchUsers } from "../actionpages/fetchUsers";
import { addAppUsers } from "../state/appUsers";
import AppUsers from "./usermanagement/AppUsers";

import "../assets/styles/styles.css";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { appUsers } = useSelector((state) => state.appUsers);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchUsers();
      dispatch(addAppUsers(response));
    };

    fetchData();
  }, []);

  return (
    <div className="dashboardMainDiv1">
      <div className="dashboardMainDiv">
        <div className="allContent">
          <div className="sidebarMenu">
            <Sidebar />
          </div>
          <div className="categoryBodyus">
            <div className="app-users-listus">
              <AppUsers appUsers={appUsers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
