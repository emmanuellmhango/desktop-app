import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import URL from "../../state/url";
import { deleteCategory } from "../../state/categorySlice";
import LoadingSpinner from "../../startscreens/Spinner";
import "../../assets/styles/styles.css";

const SystemUserList = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { systemusers } = useSelector((state) => state.systemusers);

  useEffect(() => {}, [systemusers]);

  const deleteItem = async (id) => {
    setIsLoading(true);
    const response = await axios.delete(`${URL}/${id}`);
    const { success } = response.data;
    if (success) {
      setIsLoading(false);
      dispatch(deleteCategory(id));
    } else {
      setIsLoading(false);
      alert("Error deleting Admin");
    }
  };

  const role = (role) => {
    if (role === "basicadmin") {
      return "Basic Admin";
    } else if (role === "superadmin") {
      return "Super Admin";
    }
  };
  return (
    <div className="categoriesListDiv">
      {isLoading ? <LoadingSpinner /> : null}
      <div className="categoriesListHeader2">
        <h3 className="title">System Users</h3>
      </div>
      <div className="categoriesListBody">
        <table className="table">
          <thead>
            <tr>
              <th className="categoryItemCounter">#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Credentials</th>
              <th>Role</th>
              <th className="categoryItemCounter"></th>
            </tr>
          </thead>
          <tbody>
            {systemusers &&
              systemusers.map((user, index) => (
                <tr key={user.id} className="categoryItemCat">
                  <td className="categoryItemCounter">{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>
                    Email: {user.email} <br />
                    Passw: XXXX-XXXX
                  </td>
                  <td>{role(user.role)}</td>
                  <td className="categoryItemDeleted deliconcategory">
                    <MdDeleteOutline
                      className="delete-icon"
                      disabled={isLoading}
                      onClick={() => deleteItem(user.id)}
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

export default SystemUserList;
