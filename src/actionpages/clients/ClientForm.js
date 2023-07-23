import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { GENERAL_URL } from "../../state/url";
import LoadingSpinner from "../../startscreens/Spinner";
import { addClient } from "../../state/clientSlice";

import "../../assets/styles/styles.css";

const ClientForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      company_name: e.target.elements.company_name.value,
      username: e.target.elements.username.value,
      email: e.target.elements.email.value,
      phone: e.target.elements.phone.value,
      password: e.target.elements.password.value,
      social_link: e.target.elements.social_link.value,
      package: selectedPackage,
    };
    try {
      if (selectedPackage === "") {
        alert("Please select a package");
      } else {
        const response = await axios.post(
          `${GENERAL_URL}/user_managements`,
          data
        );
        setIsLoading(false);
        const { success, userClients } = response.data;

        if (success) {
          dispatch(addClient(userClients));
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

  const handlePackageSelection = (event, selectedPackage) => {
    event.preventDefault();
    setSelectedPackage(selectedPackage);
  };

  return (
    <form id="form-edt" onSubmit={handleSubmit} className="userAddForm">
      {isLoading ? <LoadingSpinner /> : null}
      <div className="iconPart">
        <div className="form-group-client-header">
          <h3 className="title-user">Choose User Package</h3>
        </div>
        <div className="form-group-user-packages">
          <span
            className={
              selectedPackage === "basic"
                ? "selected-user-packages"
                : "user-packages"
            }
            onClick={(event) => handlePackageSelection(event, "basic")}
          >
            Basic
          </span>
          <span
            className={
              selectedPackage === "advanced"
                ? "selected-user-packages"
                : "user-packages"
            }
            onClick={(event) => handlePackageSelection(event, "advanced")}
          >
            Advanced
          </span>
          <span
            className={
              selectedPackage === "corporate"
                ? "selected-user-packages"
                : "user-packages"
            }
            onClick={(event) => handlePackageSelection(event, "corporate")}
          >
            Corporate
          </span>
          <span
            className={
              selectedPackage === "enterprise"
                ? "selected-user-packages"
                : "user-packages"
            }
            onClick={(event) => handlePackageSelection(event, "enterprise")}
          >
            Enterprise
          </span>
        </div>
        <div className="form-group-client-header">
          <h3 className="title-user">Accounts</h3>
        </div>
        <div className="form-group-user-packages">
          <span className="user-accounts"></span>
          <span className="user-accounts"></span>
          <span className="user-accounts"></span>
          <span className="user-accounts"></span>
          <span className="user-accounts"></span>
          <span className="user-accounts"></span>
          <span className="user-accounts"></span>
          <span className="user-accounts"></span>
          <span className="user-accounts"></span>
          <span className="user-accounts"></span>
        </div>
      </div>
      <div className="userForm">
        <div className="form-group-client-user">
          <div className="formLabel">
            <label htmlFor="name" className="label-client">
              Company Name
            </label>
          </div>
          <div className="formInputType">
            <input
              type="text"
              id="company_name"
              name="company_name"
              className="form-control-l-user"
              required
            />
          </div>
        </div>

        <div className="form-group-client-user">
          <div className="formLabel">
            <label htmlFor="username" className="label-client">
              User Name
            </label>
          </div>
          <div className="formInputType">
            <input
              type="text"
              id="username"
              name="username"
              className="form-control-l-user"
              required
            />
          </div>
        </div>
        <div className="form-group-client-user">
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
              className="form-control-l-user"
              required
            />
          </div>
        </div>
        <div className="form-group-client-user">
          <div className="formLabel">
            <label htmlFor="password" className="label-client">
              Passoword
            </label>
          </div>
          <div className="formInputType">
            <input
              type="password"
              id="password"
              name="password"
              className="form-control-l-user"
              required
            />
          </div>
        </div>
        <div className="form-group-client-user">
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
              className="form-control-l-user"
              required
            />
          </div>
        </div>
        <div className="form-group-client-user">
          <div className="formLabel">
            <label htmlFor="social_link" className="label-client">
              Social Link
            </label>
          </div>
          <div className="formInputType">
            <input
              type="text"
              id="social_link"
              name="social_link"
              className="form-control-l-user"
              required
            />
          </div>
        </div>
        <div className="form-group-client-user">
          <div className="formLabel"></div>
          <div className="formInputType">
            <input
              type="submit"
              value="Add User"
              className="form-control-btn-client"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ClientForm;
