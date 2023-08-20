import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { GENERAL_URL } from "../../state/url";
import { deleteClient } from "../../state/clientSlice";
import LoadingSpinner from "../../startscreens/Spinner";
import "../../assets/styles/styles.css";

const ClientList = () => {
  const dispatch = useDispatch();
  const { clients } = useSelector((state) => state.clients);
  const [newClients, setNewClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    setNewClients(clients);
    setTotalPages(Math.ceil(newClients.length / itemsPerPage));
  }, []);

  const deleteItem = async (event, id) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${GENERAL_URL}/user_managements/${id}`
      );
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
    // const { success } = response.data;
    // if (success) {
    //   setIsLoading(false);
    //   dispatch(deleteClient(id));
    // } else {
    //   setIsLoading(false);
    //   alert("Error deleting Client");
    // }
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = newClients.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="usersContainer">
      {isLoading ? <LoadingSpinner /> : null}
      <div className="categoriesListDiv">
        <div className="categoriesListHeader2">
          <h3 className="title">Clients</h3>
        </div>
        <table className="tableUsers">
          <thead className="tableHeader">
            <tr>
              <th className="categoryItemCounter">#</th>
              <th scope="col">Company Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Social Link</th>
              <th className="actionUsersWidth"></th>
            </tr>
          </thead>
          <tbody>
            {subset &&
              subset.map((client, index) => (
                <tr key={index} className="tableRow">
                  <td>{currentPage * itemsPerPage + index + 1}</td>
                  <td className="normalspace">{client.company_name}</td>
                  <td className="normalspace">{client.email}</td>
                  <td className="normalspace">{client.phone}</td>
                  <td>{client.social_link}</td>
                  <td>
                    <MdDeleteOutline
                      className="delete-icon"
                      onClick={(event) => deleteItem(event, client.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {subset && subset.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default ClientList;
