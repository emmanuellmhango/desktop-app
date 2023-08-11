import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Select from "react-select";
import URL from "../../state/url";
import LoadingSpinner from "../../startscreens/Spinner";
import { addSystemUsers } from "../../state/systemUsersSlice";

import "../../assets/styles/styles.css";

const SystemUser = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const roleData = [
    { value: "basicadmin", label: "Basic Admin" },
    { value: "superadmin", label: "Super Admin" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      phone: e.target.elements.phone.value,
      password: e.target.elements.password.value,
      role: selectedRole.value,
      dob: "---",
    };

    try {
      if (selectedRole === "") {
        alert("Please select a Role");
      } else {
        const response = await axios.post(URL, data);
        setIsLoading(false);
        const { success, sys_users } = response.data;

        if (success) {
          dispatch(addSystemUsers(sys_users));
          alert(" User Added Successfully");
        } else {
          alert("Error saving data. Please try again!");
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("Oops! Something went wrong. Please try again.");
    }
  };

  return (
    <form id="form-edt" onSubmit={handleSubmit}>
      {isLoading ? <LoadingSpinner /> : null}
      <div className="categoriesListHeader2">
        <h3 className="title">Register System User</h3>
      </div>
      <div className="userForm">
        <div className="form-group-select">
          <div className="formLabel">
            <label htmlFor="name" className="label-client">
              Name
            </label>
          </div>
          <div className="formInputType">
            <input
              type="text"
              id="name"
              name="name"
              className="form-control-l-inputcat"
              required
            />
          </div>
        </div>
        <div className="form-group-select">
          <div className="formLabel">
            <label htmlFor="email" className="label-client">
              Email
            </label>
          </div>
          <div className="formInputType">
            <input
              type="email"
              id="email"
              name="email"
              className="form-control-l-inputcat"
              required
            />
          </div>
        </div>
        <div className="form-group-select">
          <div className="formLabel">
            <label htmlFor="password" className="label-client">
              Password
            </label>
          </div>
          <div className="formInputType">
            <input
              type="password"
              id="password"
              name="password"
              className="form-control-l-inputcat"
              required
            />
          </div>
        </div>
        <div className="form-group-select">
          <div className="formLabel">
            <label htmlFor="phone" className="label-client">
              Phone
            </label>
          </div>
          <div className="formInputType">
            <input
              type="phone"
              id="phone"
              name="phone"
              className="form-control-l-inputcat"
              required
            />
          </div>
        </div>
        <div className="form-group-select">
          <div className="formLabel">
            <label htmlFor="social_link" className="label-client">
              Role
            </label>
          </div>
          <div className="formInputType">
            <Select
              options={roleData}
              id="client_id"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? "#4060a9" : "#5e2bff",
                  boxShadow: state.isFocused
                    ? "0 0 0 0.2rem rgba(69, 132, 168, 0.5)"
                    : null,
                  "&:hover": {
                    borderColor: state.isFocused ? "#4060a9" : "#5e2bff",
                  },
                  borderRadius: "20px",
                  width: "90%",
                  fontWeight: "500",
                  fontSize: "12px",
                  margin: "10px 0",
                  paddingLeft: "10px",
                  transition: "all 0.2s ease",
                }),
              }}
              className="form-control-l-select"
              onChange={(values) => setSelectedRole(values)}
            />
          </div>
        </div>
        <div className="form-group-select">
          <div className="formLabel"></div>
          <div className="formInputType">
            <input
              type="submit"
              value="Save"
              className="form-control-btn-client"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SystemUser;
