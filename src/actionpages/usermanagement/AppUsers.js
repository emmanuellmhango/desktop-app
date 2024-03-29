import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import URL from "../../state/url";
import { deleteUser } from "../../state/userSlice";
import LoadingSpinner from "../../startscreens/Spinner";
import "../../assets/styles/styles.css";

const AppUsers = ({ appUsers }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

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
      <div className="categoriesListHeader2">
        <h3 className="title">App Users</h3>
      </div>
      <div className="categoriesListBody">
        <table className="table">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            {user.role === "superadmin" ? (
              <th className="userCounter"></th>
            ) : null}
          </tr>
          <tbody>
            {appUsers &&
              appUsers.map((appUser, index) => (
                <tr className="tableRow" key={index}>
                  <td className="clientItemName">{appUser.name}</td>
                  <td className="categoryItemName">{appUser.email}</td>
                  <td className="categoryItemName">{appUser.phone}</td>
                  {user.role === "superadmin" ? (
                    <td>
                      <MdDeleteOutline
                        className="delete-icon"
                        disabled={isLoading}
                        onClick={() => deleteItem(appUser.id)}
                      />
                    </td>
                  ) : null}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppUsers;
