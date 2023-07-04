import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar";
import CategoriesList from "./categories/CategoryList";
import CategoryForm from "./categories/CategoryForm";
import { addCategory } from "../state/categorySlice";
import axios from "axios";
import { GENERAL_URL } from "../state/url";
import "../assets/styles/styles.css";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${GENERAL_URL}/categories`);
      const { success, categories } = response.data;
      if (success) {
        dispatch(addCategory(categories));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  console.log(categories);
  return (
    <div className="dashboardMainDiv">
      <div className="sidebarMenu">
        <Sidebar />
      </div>
      <div className="categoryBody">
        <div className="categoryForm">
          <CategoryForm />
        </div>
        <div className="categoriesList">
          <CategoriesList categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default Categories;
