import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { GENERAL_URL } from "../../state/url";
import { deleteCategory } from "../../state/categorySlice";
import LoadingSpinner from "../../startscreens/Spinner";
import "../../assets/styles/styles.css";
import blurImage from "../../assets/images/holder.jpg";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [sortedCategory, setSortedCategory] = useState([]);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    const sortCategories = async () => {
      const newArr = await categories.map((category) => category);
      const sortedCategories = await newArr
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((category) => ({ ...category, imageLoaded: false }));

      setSortedCategory(sortedCategories);
    };

    sortCategories();
  }, [categories]);

  const handleIconLoad = (index) => {
    const updatedCategories = [...sortedCategory];
    updatedCategories[index].imageLoaded = true;
    setSortedCategory(updatedCategories);
  };

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
        <span className="cattitle">Categories</span>
      </div>
      <div className="categoriesListBody">
        <table className="table">
          <thead>
            <tr>
              <th className="categoryItemCounter">#</th>
              <th>Category</th>
              <th className="categoryItemIcon">Icon</th>
              <th className="categoryItemCounter"></th>
            </tr>
          </thead>
          <tbody>
            {sortedCategory &&
              sortedCategory.map((category, index) => (
                <tr key={category.id} className="categoryItemCat">
                  <td className="categoryItemCounter">{index + 1}</td>
                  <td className="catname">{category.name}</td>
                  <td className="catIconBorder">
                    <img
                      src={category.imageLoaded ? category.icon : blurImage}
                      alt="Icon"
                      className="iconCategory"
                      onLoad={() => handleIconLoad(index)}
                    />
                  </td>
                  <td className="categoryItemDeleted deliconcategory">
                    <MdDeleteOutline
                      className="delete-icon"
                      disabled={isLoading}
                      onClick={() => deleteItem(category.id)}
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

export default CategoriesList;
