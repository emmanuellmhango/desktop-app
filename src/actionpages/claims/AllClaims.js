import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FcGlobe } from "react-icons/fc";
import "../../assets/styles/styles.css";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../../startscreens/Spinner";
import { reverseGeoCode } from "./reverseGeoCoding";

function AllClaims() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [geoCodes, setGeoCodes] = useState([]);
  const { claims } = useSelector((state) => state.claims);

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
          if (conv !== null) {
            setIsLoading(true);
            const res = await reverseGeoCode(conv);
            setIsLoading(false);
            setGeoCodes((geoCodes) => [
              ...geoCodes,
              { claim_id: claim.id, location: res },
            ]);
          }
        }
      });
    };

    fetchGeoData();
    return () => {};
  }, []);

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

  const goToMap = (event, claim_id) => {
    event.preventDefault();
    navigate("/map", { claim_id: claim_id });
  };

  return (
    <div className="ClaimsList">
      {isLoading ? <LoadingSpinner /> : null}
      <div className="claimsListHeader">
        <span>
          <h3 className="title">All Claims</h3>
        </span>
        <span>
          <NavLink to="/map">
            <FcGlobe className="headerIconMap" title="View on Map" />
          </NavLink>
        </span>
      </div>
      <div className="categoriesListDiv">
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
                  <tr
                    className="tableRow"
                    key={index}
                    onClick={(event) => goToMap(event, claim.id)}
                  >
                    <td>{claim.user_id}</td>
                    <td>{formatDateTime(claim.created_at)}</td>
                    <td>{getLocale(claim.id)}</td>
                    <td>{claim.category.name}</td>
                    <td>{claim.client.name}</td>
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
