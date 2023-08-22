import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Select from "react-select";
import { GENERAL_URL } from "../../state/url";
import LoadingSpinner from "../../startscreens/Spinner";
import { addCategory } from "../../state/categorySlice";

import "../../assets/styles/styles.css";

const CategoryForm = () => {
  const dispatch = useDispatch();
  const { clients } = useSelector((state) => state.clients);
  const [isLoading, setIsLoading] = useState(false);
  const [clientData, setClientData] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const imagesRef = useRef([]);

  useEffect(() => {
    setClientData([]);
    if (clients.length > 0) {
      clients.forEach((client) => {
        setClientData((prevData) => [
          ...prevData,
          { value: client.id, label: client.company_name },
        ]);
      });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("category[name]", event.target.name.value);
    formData.append("category[description]", event.target.description.value);
    formData.append("category[user_management_id]", selectedClient.value);
    formData.append("category[icon]", event.target.icon.files[0]);

    try {
      fetch(`${GENERAL_URL}/categories`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          const { success, categories } = data;
          if (success) {
            console.log(categories);
            dispatch(addCategory(categories));
          } else {
            alert(`Error saving data, Please try again!!`);
          }
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("Oops! Something went wrong, please try again");
    }
  };

  return (
    <form id="form-edt" onSubmit={handleSubmit}>
      {isLoading ? <LoadingSpinner /> : null}
      <div className="categoriesListHeader2">
        <h3 className="title">Add Category</h3>
      </div>
      <div className="form-group-select">
        <label htmlFor="name" className="label-client">
          Category Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control-l-inputcat"
          required
          placeholder="E.g. Infrastructure"
        />
      </div>
      <div className="form-group-select">
        <label htmlFor="description" className="label-client">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="E.g. This category is for all electricity related tags. use *your text* for bullet points"
          className="form-control-l-inputcat-textarea"
          required
        />
      </div>
      <div className="form-group-select">
        <label htmlFor="name" className="label-client">
          Select Icon
        </label>
        <input
          type="file"
          id="icon"
          name="icon"
          className="form-control-l-iconcat"
          required
          accept=".jpg, .png, .jpeg, .svg"
          multiple
          ref={imagesRef}
        />
      </div>
      <div className="form-group-select">
        <label htmlFor="client_id" className="label-client">
          Client to Link
        </label>
        <Select
          options={clientData}
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
          onChange={(values) => setSelectedClient(values)}
        />
      </div>
      <div className="form-group-push">
        <input
          type="submit"
          value="Save"
          className="form-control-btncat"
          disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default CategoryForm;
