import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FcGlobe } from "react-icons/fc";
import "../../assets/styles/styles.css";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import blurImage from "../../assets/images/holder.jpg";
import formatDateTime from "../../state/formatDate";

function AllClaims() {
  const navigate = useNavigate();
  const [sortedClaims, setSortedClaims] = useState([]);
  const { claims } = useSelector((state) => state.claims);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const sortClaims = async () => {
      if (claims) {
        const newArr = await claims.map((claim) => claim);
        const sortedClaims = await newArr
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((claim) => ({ ...claim, imageLoaded: false }));

        setSortedClaims(sortedClaims);
        setTotalPages(Math.ceil(sortedClaims.length / itemsPerPage));
      }
    };

    sortClaims();
  }, [claims]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = sortedClaims.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const goToMap = (event, claim_id) => {
    event.preventDefault();
    navigate("/map", { claim_id: claim_id });
  };

  const handleImageLoad = (index) => {
    const updatedClaims = [...sortedClaims];
    updatedClaims[index].imageLoaded = true;
    setSortedClaims(updatedClaims);
  };

  return (
    <div className="ClaimsList">
      <div className="claimsListHeader">
        <span>
          <h3 className="title">All Tags</h3>
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
              <th className="normalspace">Time</th>
              <th>Location</th>
              <th className="normalspace">Category</th>
              <th>Comment</th>
              <th className="imagesSpace">Images</th>
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
                          onLoad={() => handleImageLoad(index)}
                        />
                      ))}
                    </div>
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
}

export default AllClaims;
