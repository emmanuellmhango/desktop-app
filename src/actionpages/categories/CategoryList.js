import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { GENERAL_URL } from "../../state/url";
import { deleteCategory } from "../../state/categorySlice";
import LoadingSpinner from "../../startscreens/Spinner";
import "../../assets/styles/styles.css";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { categories } = useSelector((state) => state.categories);

  const deleteItem = async (id) => {
    setIsLoading(true);
    const response = await axios.delete(`${GENERAL_URL}/categories/${id}`);
    const { success } = response.data;
    if (success) {
      setIsLoading(false);
      dispatch(deleteCategory(id));
    } else {
      setIsLoading(false);
      alert("Error deleting category");
    }
  };

  return (
    <div className="categoriesListDiv">
      {isLoading ? <LoadingSpinner /> : null}
      <div className="categoriesListHeader">
        <h3 className="title">Categories</h3>
      </div>
      <div className="categoriesListBody">
        {categories &&
          categories.map((category) => (
            <div className="categoryItem" key={category.id}>
              <div className="categoryItemName">{category.name}</div>
              <div className="categoryItemIcon">{category.icon}</div>
              <div className="categoryItemDeleted">
                <MdDeleteOutline
                  className="delete-icon"
                  disabled={isLoading}
                  onClick={() => deleteItem(category.id)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoriesList;
