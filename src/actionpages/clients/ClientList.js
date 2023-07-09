import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { GENERAL_URL } from "../../state/url";
import { deleteClient } from "../../state/clientSlice";
import LoadingSpinner from "../../startscreens/Spinner";
import "../../assets/styles/styles.css";

const ClientList = () => {
  const dispatch = useDispatch();
  const { clients } = useSelector((state) => state.clients);
  const [isLoading, setIsLoading] = useState(false);

  const deleteItem = async (event, id) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await axios.delete(
      `${GENERAL_URL}/user_managements/${id}`
    );
    const { success } = response.data;
    if (success) {
      setIsLoading(false);
      dispatch(deleteClient(id));
    } else {
      setIsLoading(false);
      alert("Error deleting Client");
    }
  };

  return (
    <div className="usersContainer">
      {isLoading ? <LoadingSpinner /> : null}
      <div className="categoriesListHeader">
        <h3 className="title">User List</h3>
      </div>
      <div className="categoriesListBody">
        <table className="tableUsers">
          <thead className="tableHeader">
            <tr>
              <th scope="col">Company Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Social Link</th>
              <th scope="col">Package</th>
              <th className="actionUsersWidth"></th>
            </tr>
          </thead>
          <tbody>
            {clients &&
              clients.map((client, index) => (
                <tr key={index} className="tableRow">
                  <td>{client.company_name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>{client.social_link}</td>
                  <td>{client.package}</td>
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
      </div>
    </div>
  );
};

export default ClientList;
