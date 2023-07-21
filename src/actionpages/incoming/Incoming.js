import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GENERAL_URL } from "../../state/url";
import { FcGlobe } from "react-icons/fc";
import { PiArrowBendDoubleUpRightBold } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../../startscreens/Spinner";
import { reverseGeoCode } from "../claims/reverseGeoCoding";
import "../../assets/styles/styles.css";

const Incoming = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [geoCodes, setGeoCodes] = useState([]);
  const [incomingClaims, setIncomingClaims] = useState([]);
  const { claims } = useSelector((state) => state.claims);

  useEffect(() => {
    const fetchIncomingClaims = async () => {
      const filteredClaims = claims.filter(
        (claim) => claim.forwarded === "false"
      );

      const sortedClaims = filteredClaims.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setIncomingClaims(sortedClaims);
    };

    fetchIncomingClaims();
  }, []);

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

  const rejectClaim = async (event, claim_id) => {
    event.preventDefault();
    event.stopPropagation();
    const data = {
      forwarded: "rejected",
    };

    try {
      const response = await axios.put(
        `${GENERAL_URL}/claims/${claim_id}`,
        data
      );
      const { success } = response.data;
      if (success) {
        const updatedClaims = incomingClaims.filter((c) => c.id !== claim_id);
        setIncomingClaims(updatedClaims);
      } else {
        alert("Oops! something went wrong");
      }
    } catch (error) {
      console.error("Error updating claim:", error);
      alert("Oops! something went wrong");
    }
  };

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

  const forwardClaim = (event, claim) => {
    event.preventDefault();
    event.stopPropagation();
    alert(claim.id);
  };

  return (
    <div className="ClaimsList">
      {isLoading ? <LoadingSpinner /> : null}
      <div className="claimsListHeader">
        <span>
          <h3 className="title">Incoming Claims</h3>
        </span>
        <span>
          <NavLink to="/map">
            <FcGlobe className="headerIconMap" title="View on Map" />
          </NavLink>
        </span>
      </div>
      <div className="categoriesListDiv">
        <table className="table">
          <thead className="tableHeader">
            <tr>
              <th className="userCounter">User ID</th>
              <th>Time</th>
              <th>Location</th>
              <th>Category</th>
              <th>Comment</th>
              <th>Images</th>
              <th className="actionTD">Action</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {incomingClaims &&
              incomingClaims.map((claim, index) => (
                <tr
                  className="tableRow"
                  key={index}
                  onClick={(event) => goToMap(event, claim.id)}
                >
                  <td>{claim.user_id}</td>
                  <td>{formatDateTime(claim.created_at)}</td>
                  <td>{claim.geocode}</td>
                  <td>{claim.category.name}</td>
                  <td>{claim.comment}</td>
                  <td>Image 1, Image 2</td>
                  <td>
                    {claim.forwarded === "false" && (
                      <div className="actions">
                        <button
                          className="actionButtonReject space-forward"
                          onClick={(event) => rejectClaim(event, claim.id)}
                        >
                          <MdDeleteForever className="forwardIcon" />
                        </button>
                        <button
                          className="actionButtonForward"
                          onClick={(event) => forwardClaim(event, claim)}
                        >
                          <PiArrowBendDoubleUpRightBold className="forwardIcon" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Incoming;
