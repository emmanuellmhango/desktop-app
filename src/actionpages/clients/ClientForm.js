import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { GENERAL_URL } from "../../state/url";
import LoadingSpinner from "../../startscreens/Spinner";
import { addCategory } from "../../state/categorySlice";

import "../../assets/styles/styles.css";

const ClientForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const name = event.target.name.value;
    const phone = event.target.phone.value;
    const email = event.target.email.value;
    const icon = event.target.icon.files[0];
    const formData = { name, phone, email, icon };
    event.target.name.value = "";
    event.target.phone.value = "";
    event.target.email.value = "";
    event.target.icon.value = "";
    await axios
      .post(`${GENERAL_URL}/categories`, formData)
      .then((response) => {
        setIsLoading(false);
        const { success, categories } = response.data;
        if (success) {
          dispatch(addCategory(categories));
        } else {
          alert(`Error saving data, Please try again!!`);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        alert("Oops! Something went wrong, please try again");
      });
  };
  return (
    <form id="form-edt" onSubmit={handleSubmit}>
      {isLoading ? <LoadingSpinner /> : null}
      <h3 className="title">Add Client</h3>
      <div className="form-group-client">
        <label htmlFor="name" className="label-client">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control-l"
          required
          placeholder="E.g. City Council"
        />
      </div>

      <div className="form-group-client">
        <label htmlFor="name" className="label-client">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control-l"
          required
          placeholder="E.g. abc@abc.com"
        />
      </div>
      <div className="form-group-client">
        <label htmlFor="name" className="label-client">
          Phone
        </label>
        <input
          type="phone"
          id="phone"
          name="phone"
          className="form-control-l"
          required
          placeholder="E.g. +994123456789"
        />
      </div>
      <div className="form-group-client">
        <label htmlFor="name" className="label-client">
          Icon
        </label>
        <input
          type="file"
          id="icon"
          name="icon"
          className="form-control-l-icon"
          required
        />
      </div>
      <div className="form-group-push">
        <input
          type="submit"
          value="Save"
          className="form-control-btn-client"
          disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default ClientForm;
