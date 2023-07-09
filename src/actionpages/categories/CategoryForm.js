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
    const icon = "";
    const formData = { name, icon };
    event.target.name.value = "";
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
      <h3 className="title">Add Category</h3>
      <div className="form-group-select">
        <label htmlFor="name" className="label-client">
          Category Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control-l-input"
          required
          placeholder="E.g. Infrastructure"
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
              width: "100%",
              fontWeight: "500",
              fontSize: "1.2rem",
              margin: "10px 0",
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
          className="form-control-btn"
          disabled={isLoading}
        />
        <button type="reset" className="form-control-btn">
          Clear
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
