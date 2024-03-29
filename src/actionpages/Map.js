import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { addSelectedClaim } from "../state/selectedClaimSlice";
import ClaimLocations from "./map/ClaimLocations";
import ClaimMapDisplay from "./map/ClaimMapDisplay";
import { FiMenu } from "react-icons/fi";

const Map = () => {
  const dispatch = useDispatch();
  const { selectedClaim } = useSelector((state) => state.selectedClaim);

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve([
              position.coords.latitude,
              position.coords.longitude,
              "My Current Center Position",
            ]);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported"));
      }
    });
  };

  useEffect(() => {
    const fetchSelectedClaimLocation = async () => {
      try {
        if (!selectedClaim || selectedClaim.length < 1) {
          const curPos = await getCurrentLocation();
          dispatch(addSelectedClaim(curPos));
        }
      } catch (error) {
        console.error("Error getting current location:", error);
      }
    };

    fetchSelectedClaimLocation();
  }, [dispatch, selectedClaim]);

  return (
    <div className="dashboardMainDiv1">
      <div className="dashboardMainDiv">
        <div className="allContent">
          <div className="sidebarMenu">
            <Sidebar />
          </div>
          <div className="categoryBody">
            <div className="ClaimsFormM">
              <ClaimLocations />
            </div>
            <div className="claimsListContainer">
              <ClaimMapDisplay />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
