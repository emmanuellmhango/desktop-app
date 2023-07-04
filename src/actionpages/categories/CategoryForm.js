import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { GENERAL_URL } from "../../state/url";
import LoadingSpinner from "../../startscreens/Spinner";
import { addCategory } from "../../state/categorySlice";

import "../../assets/styles/styles.css";

const CategoryForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

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
      <div className="form-group-push">
        <input
          type="text"
          id="name"
          name="name"
          className="form-control-l"
          required
          placeholder="E.g. Infrastructure"
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
