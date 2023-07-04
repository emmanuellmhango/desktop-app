import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { GENERAL_URL } from "../../state/url";
import { deleteClient } from "../../state/clientSlice";
import LoadingSpinner from "../../startscreens/Spinner";
import "../../assets/styles/styles.css";

const ClientList = ({ clients }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const deleteItem = async (id) => {
    setIsLoading(true);
    const response = await axios.delete(`${GENERAL_URL}/clients/${id}`);
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
    <div className="categoriesListDiv">
      {isLoading ? <LoadingSpinner /> : null}
      <div className="categoriesListHeader">
        <h3 className="title">Clients</h3>
      </div>
      <div className="categoriesListBody">
        {clients &&
          clients.map((client) => (
            <div className="categoryItem" key={client.id}>
              <div className="categoryItemName">{client.name}</div>
              <div className="categoryItemIcon">{client.icon}</div>
              <div className="categoryItemDeleted">
                <MdDeleteOutline
                  className="delete-icon"
                  disabled={isLoading}
                  onClick={() => deleteItem(client.id)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ClientList;
