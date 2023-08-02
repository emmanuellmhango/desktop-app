import React, { useState, useEffect } from "react";
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
    const name = event.target.name.value;
    const iconFile = event.target.icon.files[0];
    const formData = new FormData();
    formData.append("name", name);
    formData.append("client_id", selectedClient);
    formData.append("icon", iconFile);

    event.target.name.value = "";
    event.target.icon.value = null;

    try {
      const response = await axios.post(`${GENERAL_URL}/categories`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
      const { success, categories } = response.data;
      if (success) {
        dispatch(addCategory(categories));
      } else {
        alert(`Error saving data, Please try again!!`);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("Oops! Something went wrong, please try again");
    }
  };
  return (
    <form id="form-edt" onSubmit={handleSubmit}>
      {isLoading ? <LoadingSpinner /> : null}
      <span className="cattitle">Add Category</span>
      <br />
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
        <label htmlFor="name" className="label-client">
          Select Icon
        </label>
        <input
          type="file"
          id="icon"
          name="icon"
          className="form-control-l-iconcat"
          required
          accept=".jpg, .png, .jpeg"
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
