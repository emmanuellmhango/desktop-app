import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GENERAL_URL } from "../../state/url";
import { FcGlobe } from "react-icons/fc";
import { PiArrowBendDoubleUpRightBold } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import blurImage from "../../assets/images/holder.jpg";
import "../../assets/styles/styles.css";

const Incoming = () => {
  const navigate = useNavigate();
  const [incomingClaims, setIncomingClaims] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;
  const { claims } = useSelector((state) => state.claims);

  useEffect(() => {
    const fetchIncomingClaims = async () => {
      const filteredClaims = await claims.filter(
        (claim) => claim.forwarded === "false"
      );

      const sortedClaims = await filteredClaims.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setIncomingClaims(sortedClaims);
      setTotalPages(Math.ceil(sortedClaims.length / itemsPerPage));
    };

    fetchIncomingClaims();
  }, []);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = incomingClaims.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

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

  // Helper function to handle image load
  const handleImageLoad = (claimId) => {
    const updatedClaims = incomingClaims.map((claim) =>
      claim.id === claimId ? { ...claim, imageLoaded: true } : claim
    );
    setIncomingClaims(updatedClaims);
  };

  return (
    <div className="ClaimsList">
      <div className="claimsListHeader">
        <span className="claimsheaderWS">
          <h3 className="title">Incoming Claims</h3>
        </span>
        <span className="claimsheaderDS title">Incoming Claims</span>
      </div>
      <div className="categoriesListDiv">
        <table className="table">
          <thead className="tableHeader">
            <tr>
              <th className="userCounter">#</th>
              <th className="normalspace">Time</th>
              <th>Location</th>
              <th className="normalspace">Category</th>
              <th>Comment</th>
              <th className="imagesSpace">Images</th>
              <th className="actionTD">Action</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {subset &&
              subset.map((claim, index) => (
                <tr
                  className="tableRow"
                  key={index}
                  onClick={(event) => goToMap(event, claim.id)}
                >
                  <td>{currentPage * itemsPerPage + index + 1}</td>
                  <td>{formatDateTime(claim.created_at)}</td>
                  <td>{claim.geocode}</td>
                  <td>{claim.category.name}</td>
                  <td>{claim.comment}</td>
                  <td>
                    <div className="imagesCounter">
                      {claim.images.map((image, imageIndex) => (
                        <img
                          src={claim.imageLoaded ? image : blurImage}
                          alt="claim"
                          key={imageIndex}
                          className="claimimageDisplay"
                          onLoad={() => handleImageLoad(claim.id)}
                        />
                      ))}
                    </div>
                  </td>
                  <td>
                    {claim.forwarded === "false" && (
                      <div className="actions">
                        <button
                          className="actionButtonReject space-forward space-bottom"
                          onClick={(event) => rejectClaim(event, claim.id)}
                        >
                          <MdDeleteForever className="forwardIcon" />
                        </button>
                        <button
                          className="actionButtonForward space-forward"
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
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={handlePageChange}
          forcePage={currentPage}
          previousLabel={"Prev"}
          nextLabel={"Next"}
          containerClassName={"pagination"}
          activeClassName={"pagination-active"}
          pageClassName={"pagination-break"}
          previousClassName={"pagination-previous"}
        />
      </div>
    </div>
  );
};

export default Incoming;
