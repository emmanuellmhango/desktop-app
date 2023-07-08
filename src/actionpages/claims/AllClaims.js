import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FcGlobe } from "react-icons/fc";
import { FaListOl } from "react-icons/fa";
import { fetchClaims } from "./fetchClaims";
import "../../assets/styles/styles.css";
import { NavLink } from "react-router-dom";
import { addClaim } from "../../state/claimsSlice";
import LoadingSpinner from "../../startscreens/Spinner";
import { reverGeoCode } from "./reverseGeoCoding";

function AllClaims() {
  const [isLoading, setIsLoading] = useState(false);
  const [geoCodes, setGeoCodes] = useState([]);
  const dispatch = useDispatch();
  const { claims } = useSelector((state) => state.claims);

  useEffect(() => {
    const fetchClaimsData = async () => {
      setIsLoading(true);
      const claimData = await fetchClaims();
      setIsLoading(false);
      dispatch(addClaim(claimData));
    };

    fetchClaimsData();
    return () => {
      console.log("cleanup");
    };
  }, [dispatch]);

  useEffect(() => {
    const fetchGeoData = async () => {
      setGeoCodes([]);
      claims.map(async (claim, index) => {
        if (
          (claim.location && claim.location !== null) ||
          claim.location !== "null"
        ) {
          const conv = JSON.parse(claim.location);
          if (conv === null) return;
          if (
            conv.latitude !== null &&
            conv.longitude !== null &&
            conv !== null
          ) {
            const res = await reverGeoCode(conv);
            setGeoCodes((geoCodes) => [
              ...geoCodes,
              { claim_id: claim.id, location: res },
            ]);
          }
        }
      });
    };

    fetchGeoData();
    return () => {
      console.log("cleanup");
    };
  }, []);

  // console.log("claims: ", claims.length);
  // console.log("geoCodes: ", geoCodes);

  const getLocale = (id) => {
    const locale = geoCodes.find((geoCode) => geoCode.claim_id === id);
    if (locale) {
      return locale.location;
    }
    return "na";
  };

  function formatDateTime(dateTimeString) {
    const options = {
      dateStyle: "short",
      timeStyle: "short",
    };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(undefined, options);
  }

  return (
    <div className="ClaimsList">
      {isLoading ? <LoadingSpinner /> : null}
      <div className="categoriesListDiv">
        <div className="claimsListHeader">
          <span>
            <NavLink to="/claims">
              <FaListOl className="headerIconList" title="View as List" />
            </NavLink>
          </span>
          <span>
            <h3 className="title">All Claims</h3>
          </span>
          <span>
            <NavLink to="/map">
              <FcGlobe className="headerIconMap" title="View on Map" />
            </NavLink>
          </span>
        </div>
        <div className="categoriesListBody">
          <table className="table">
            <thead className="tableHeader">
              <tr>
                <th className="userCounter">User ID</th>
                <th>Time</th>
                <th>Location</th>
                <th>Category</th>
                <th>Client</th>
                <th>Comment</th>
                <th>Images</th>
              </tr>
            </thead>
            <tbody className="tableBody">
              {claims &&
                claims.map((claim, index) => (
                  <tr className="tableRow" key={index}>
                    <td>{index + 1}</td>
                    <td>{formatDateTime(claim.created_at)}</td>
                    <td>{getLocale(claim.id)}</td>
                    <td>{claim.category_id}</td>
                    <td>{claim.client_id}</td>
                    <td>{claim.comment}</td>
                    <td>Image 1, Image 2</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllClaims;
