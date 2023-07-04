import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import URL from "../../state/url";
import { deleteUser } from "../../state/userSlice";
import LoadingSpinner from "../../startscreens/Spinner";
import "../../assets/styles/styles.css";

const AppUsers = ({ appUsers }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const deleteItem = async (id) => {
    setIsLoading(true);
    const response = await axios.delete(`${URL}/${id}`);
    const { success } = response.data;
    if (success) {
      setIsLoading(false);
      dispatch(deleteUser(id));
    } else {
      setIsLoading(false);
      alert("Error deleting Client");
    }
  };

  return (
    <div className="categoriesListDiv">
      {isLoading ? <LoadingSpinner /> : null}
      <div className="categoriesListHeader">
        <h3 className="title">App Users</h3>
      </div>
      <div className="categoriesListBody">
        {appUsers &&
          appUsers.map((appUser, index) => (
            <div className="categoryItem" key={index}>
              <div className="clientItemName">{appUser.name}</div>
              <div className="categoryItemName">{appUser.email}</div>
              <div className="categoryItemName">{appUser.phone}</div>
              <div className="categoryItemDeleted">
                <MdDeleteOutline
                  className="delete-icon"
                  disabled={isLoading}
                  onClick={() => deleteItem(appUser.id)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AppUsers;
