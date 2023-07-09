import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSelectedClaim } from "../../state/selectedClaimSlice";

const ClaimLocations = () => {
  const dispatch = useDispatch();
  const { claims } = useSelector((state) => state.claims);

  const sanitizeGeoData = async (data) => {
    if ((data && data !== null) || data !== "null") {
      const conv = JSON.parse(data);
      if (conv === null) return;
      if (conv !== null) {
        return [conv.latitude, conv.longitude];
      }
    }
  };

  const openOnMap = (event, id) => {
    event.preventDefault();
    const data = claims.find((claim) => claim.id === id);
    const { location, comment } = data;
    if (location && location !== null && location !== "null") {
      sanitizeGeoData(location).then((res) => {
        dispatch(addSelectedClaim([...res, comment]));
      });
    }
  };

  return (
    <div className="claimsHolderList">
      <ul className="dashboardMenuList">
        {claims &&
          claims.map((claim, index) => {
            return (
              <li
                key={index}
                className="claimsListItem"
                onClick={(event) => openOnMap(event, claim.id)}
              >
                <span className="claimsListName">Claim_000{claim.id}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ClaimLocations;
