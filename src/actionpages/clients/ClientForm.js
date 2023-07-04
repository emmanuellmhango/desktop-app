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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("client[name]", e.target.name.value);
    formData.append("client[phone]", e.target.phone.value);
    formData.append("client[email]", e.target.email.value);
    formData.append("client[icon]", e.target.icon.files[0]);

    try {
      const response = await axios.post(`${GENERAL_URL}/clients`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsLoading(false);
      const { success, clients } = response.data;

      if (success) {
        dispatch(addClient(clients));
      } else {
        alert("Error saving data. Please try again!");
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
          name="icon"
          accept="image/*"
          multiple={false}
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
